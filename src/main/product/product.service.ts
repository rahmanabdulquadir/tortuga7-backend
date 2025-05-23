import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { Prisma, Product, Service, Spec } from '@prisma/client'; // at the top
import { UpdateProductDto } from './update-product.dto';
import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { Readable } from 'stream';



// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



function buildSpecFilterArray(filters?: Record<string, string>) {
  if (!filters) return [];

  return Object.entries(filters).map(([key, value]) => ({
    [key]: value,
  }));
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    console.log(dto)
    const { serviceId, filters, slug, ...rest } = dto;
    console.log('DTO:', dto);
  
    // Validate filters
    if (filters) {
      if (!filters.length) {
        throw new BadRequestException('Filters array must not be empty if provided');
      }
      if (filters.some((filter) => !filter.name || !filter.value)) {
        throw new BadRequestException('All filters must have non-empty name and value');
      }
    }
  
    // Convert FilterDto[] to plain JSON array
    const plainFilters: Prisma.InputJsonValue | undefined = filters
      ? filters.map(({ name, value }) => ({ name, value }))
      : undefined;
  
    try {
      return await this.prisma.product.create({
        data: {
          ...rest,
          slug,
          filters: plainFilters,
          service: serviceId ? { connect: { id: serviceId } } : undefined,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException(`A product with slug "${slug}" already exists`);
      }
      throw error;
    }
  }

  async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'products', // Optional folder name in Cloudinary
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result?.secure_url || '');
        },
      );

      // Convert buffer to readable stream
      const readable = new Readable();
      readable.push(file.buffer);
      readable.push(null);
      readable.pipe(stream);
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { service: true, specs: true },
    });
  }

  async findAllPaginated(page?: number, limit?: number, filters?: { productName?: string; productModel?: string; brandName?: string; generation?: string; cpuType?: string; }) {
    // If either page or limit is missing, return all products
    if (!page || !limit) {
      const products = await this.prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { service: true, specs: true },
      });
  
      return {
        data: products,
        total: products.length,
        currentPage: null,
        totalPages: null,
      };
    }
  
    const skip = (page - 1) * limit;
  
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { service: true, specs: true },
      }),
      this.prisma.product.count(),
    ]);
  
    return {
      data: products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async findAllPaginatedWithFilters(
    page?: number,
    limit?: number,
    filters?: Record<string, string | string[]>,
    searchTerm?: string
  ) {
    const filterEntries = Object.entries(filters || {}).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        (Array.isArray(value)
          ? value.length > 0
          : typeof value === 'string' && value.trim() !== '')
    );
  
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;
  
    // Filtering by filters (JSON field logic)
    for (const [key, value] of filterEntries) {
      const values = Array.isArray(value) ? value : [value];
  
      const orConditions = values
        .filter((v): v is string => typeof v === 'string')
        .map(() => `
          EXISTS (
            SELECT 1 FROM jsonb_array_elements("filters") AS elem
            WHERE LOWER(elem->>'name') = LOWER($${paramIndex++})
            AND LOWER(elem->>'value') = LOWER($${paramIndex++})
          )
        `)
        .join(' OR ');
  
      if (orConditions) {
        conditions.push(`(${orConditions})`);
      }
  
      for (const v of values) {
        if (typeof v === 'string') {
          params.push(key, v.trim());
        }
      }
    }
  
    // Add search condition
    if (searchTerm && searchTerm.trim() !== '') {
      const searchConditions = [
        `"productName" ILIKE $${paramIndex++}`,
        `"productModel" ILIKE $${paramIndex++}`,
        `"brandName" ILIKE $${paramIndex++}`,
        `"description" ILIKE $${paramIndex++}`
      ];
      conditions.push(`(${searchConditions.join(' OR ')})`);
      const likeSearch = `%${searchTerm.trim()}%`;
      params.push(likeSearch, likeSearch, likeSearch, likeSearch);
    }
  
    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  
    const query = `
      SELECT *,
        (SELECT COUNT(*) FROM "Product" ${whereClause}) as total
      FROM "Product"
      ${whereClause}
      ORDER BY "createdAt" DESC
      ${page && limit ? `LIMIT $${paramIndex++} OFFSET $${paramIndex++}` : ''}
    `;
  
    if (page && limit) {
      params.push(limit, (page - 1) * limit);
    }
  
    const results = await this.prisma.$queryRawUnsafe<
      (Product & { total: number })[]
    >(query, ...params);
  
    const productIds = results.map(p => p.id);
  
    const specs = await this.prisma.spec.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
    });
  
    const services = await this.prisma.service.findMany({
      where: {
        id: {
          in: results
            .map((p) => p.serviceId)
            .filter((id): id is string => id !== null),
        },
      },
    });
  
    const specsMap = new Map<string, Spec[]>();
    for (const spec of specs) {
      if (spec.productId) {
        if (!specsMap.has(spec.productId)) {
          specsMap.set(spec.productId, []);
        }
        specsMap.get(spec.productId)?.push(spec);
      }
    }
  
    const serviceMap = new Map<string, Service>();
    for (const service of services) {
      serviceMap.set(service.id, service);
    }
  
    const products = results.map((result) => ({
      ...result,
      total: undefined,
      service: result.serviceId ? serviceMap.get(result.serviceId) : null,
      specs: specsMap.get(result.id) || [],
    }));
  
    const total = results.length > 0 ? Number(results[0].total) : 0;
  
    return {
      data: products,
      total,
      currentPage: page || null,
      totalPages: page && limit ? Math.ceil(total / limit) : null,
    };
  }
  
  
  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { service: true, specs: true },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({ where: { id } });
  
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
  
    const { serviceId, filters, ...rest } = dto;
  
    // Convert filters to plain JSON if it exists
    const plainFilters: Prisma.InputJsonValue | undefined = filters
      ? JSON.parse(JSON.stringify(filters))
      : undefined;
  
    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(serviceId && {
          service: {
            connect: { id: serviceId },
          },
        }),
        ...(plainFilters !== undefined && { filters: plainFilters }),
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({ where: { id } });

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }

  // ✅ New dynamic filter method (raw SQL)
  async findAllBySpecValue(value: string, serviceId?: string) {
    const serviceFilter = serviceId ? `AND p."serviceId" = $2` : '';
  
    const query = `
      SELECT DISTINCT p.*
      FROM "Product" p
      JOIN "Spec" s ON s."productId" = p.id
      WHERE EXISTS (
        SELECT 1 FROM jsonb_array_elements(s.data) elem
        WHERE elem::text ILIKE $1
      )
      ${serviceFilter};
    `;
  
    const params = serviceId ? [`%${value}%`, serviceId] : [`%${value}%`];
  
    const products = await this.prisma.$queryRawUnsafe<Product[]>(query, ...params);
  
    return {
      success: true,
      count: products.length,
      data: products,
    };
  }  
}
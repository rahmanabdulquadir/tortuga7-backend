import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { Prisma, Product } from '@prisma/client'; // at the top
import { UpdateProductDto } from './update-product.dto';



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
    filters?: Record<string, string>,
  ) {

    const filterConditions = Object.entries(filters || {})
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => ({
        name: key,
        value: !isNaN(Number(value)) && value.trim() !== '' ? Number(value) : value,
      }));

    if (!filterConditions.length) {
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
  
    const jsonConditions = filterConditions
      .map((_, index) => `"filters" @> $${index + 1}::jsonb`)
      .join(' AND ');
  
    const query = `
      SELECT *, 
             (SELECT COUNT(*) 
              FROM "Product" 
              WHERE ${jsonConditions}) as total
      FROM "Product"
      WHERE ${jsonConditions}
      ORDER BY "createdAt" DESC
      ${page && limit ? `LIMIT $${filterConditions.length + 1} OFFSET $${filterConditions.length + 2}` : ''}
    `;
  

    const params = [
      ...filterConditions.map((condition) => {
        const formattedCondition = [{
          name: condition.name,
          value: typeof condition.value === 'number' ? condition.value.toString() : condition.value,
        }];
        return JSON.stringify(formattedCondition);
      }),
      ...(page && limit ? [limit, (page - 1) * limit] : []),
    ];
  
    // console.log('Raw Query:', query);
    // console.log('Query Params:', params);
  
  
    const debugFilters = await this.prisma.$queryRawUnsafe<
      { filters: any }[]
    >(`SELECT filters FROM "Product" WHERE "filters" IS NOT NULL LIMIT 5`);
    console.log('Sample filters data:', debugFilters);
  
    const results = await this.prisma.$queryRawUnsafe<
      (Product & { total: number })[]
    >(query, ...params);
  
    const products = results.map((result) => ({
      ...result,
      total: undefined, 
      service: result.serviceId ? { id: result.serviceId } : null, 
      specs: [], 
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

  // async update(id: string, dto: UpdateProductDto) {
  //   const existingProduct = await this.prisma.product.findUnique({ where: { id } });
  
  //   if (!existingProduct) {
  //     throw new NotFoundException('Product not found');
  //   }
  
  //   const { serviceId, ...rest } = dto;
  
  //   return this.prisma.product.update({
  //     where: { id },
  //     data: {
  //       ...rest,
  //       ...(serviceId && {
  //         service: {
  //           connect: { id: serviceId },
  //         },
  //       }),
  //     },
  //   });
  // }
  

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
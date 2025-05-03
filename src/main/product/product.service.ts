import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from '@prisma/client'; // at the top
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
    const { serviceId, ...rest } = dto;
    console.log(rest)
    return this.prisma.product.create({
      data: {
        ...rest,
        service: {
          connect: { id: serviceId },
        },
      },
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
    filters?: Record<string, string>,
  ) {
    const filterConditions = Object.entries(filters || {})
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => ({
        filters: {
          path: ["$[*]"],
          array_contains: {
            name: key,
            value: value,
          },
        },
      }));
  
    const where = filterConditions.length ? { AND: filterConditions } : {};
  
    if (!page || !limit) {
      const products = await this.prisma.product.findMany({
        where,
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
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { service: true, specs: true },
      }),
      this.prisma.product.count({ where }),
    ]);
  
    return {
      data: products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
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
  
    const { serviceId, ...rest } = dto;
  
    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        ...(serviceId && {
          service: {
            connect: { id: serviceId },
          },
        }),
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
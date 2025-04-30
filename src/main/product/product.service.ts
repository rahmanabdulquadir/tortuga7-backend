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

//   async findAllFiltered(query: {
//     serviceId?: string;
//     filters?: Record<string, string>;
//   }) {
//     const { serviceId, filters } = query;

//     const products = await this.prisma.product.findMany({
//       where: {
//         ...(serviceId && { serviceId }),

//         specs: {
//           some: {
//             data: {
//               path: [],
//               array_contains: buildSpecFilterArray(filters),
//             },
//           },
//         },
//       },
//       include: {
//         specs: true,
//       },
//     });

//     return {
//       success: true,
//       count: products.length,
//       data: products,
//     };
//   }

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

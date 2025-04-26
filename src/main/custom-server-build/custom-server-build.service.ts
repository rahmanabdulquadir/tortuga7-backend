import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomServerBuildDto } from './create-custom-server-build.dto';
import { UpdateCustomServerBuildDto } from './update-custom-server-build.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class CustomServerBuildService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomServerBuildDto) {
    const newProduct = await this.prisma.product.create({
      data: {
        ...data,
        serviceName: 'Custom Server Build',
        description: data.description ?? '',
        keyApplications: data.keyApplications ?? [],
        keyFeatures: data.keyFeatures ?? [],
        specifications: data.specifications ?? [],
        images: data.images ?? [],
      },
    });
  
    return { success: true, message: 'Product created successfully', data: newProduct };
  }
  

  async findAll(query: { page?: number; limit?: number; productModel?: string }) {
    const { page = 1, limit = 10, productModel } = query;
  
    const where: Prisma.ProductWhereInput = {
      serviceName: 'Custom Server Build',
      ...(productModel && {
        productModel: {
          contains: productModel,
          mode: Prisma.QueryMode.insensitive, // ✅ use enum here
        },
      }),
    };
  
    const total = await this.prisma.product.count({ where });
    const data = await this.prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  
    return {
      success: true,
      serviceName: 'Custom Server Build',
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  }
  
  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { success: true, serviceName: 'Custom Server Build', data: product };
  }

  async update(slug: string, data: UpdateCustomServerBuildDto) {
    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    const updated = await this.prisma.product.update({
      where: { slug },
      data: {
        ...data,
      },
    });

    return { success: true, message: 'Product updated successfully', data: updated };
  }

  async delete(slug: string) {
    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({ where: { slug } });

    return { success: true, message: 'Product deleted successfully' };
  }
}

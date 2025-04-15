import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { FilterProductDto } from './filter-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const { specs, ...productData } = dto;
  
    return this.prisma.product.create({
      data: {
        ...productData,
        specs: specs ? { create: specs } : undefined,
      },
      include: {
        specs: true, // optional: includes specs in response
      },
    });
  }

  // async findAll() {
  //   return this.prisma.product.findMany({
  //     include: { service: true },
  //   });
  // }



  async findAll(filter?: FilterProductDto) {
    const { search, minPrice, maxPrice, serviceId, partnerId } = filter || {};
  
    const conditions: Prisma.ProductWhereInput[] = [];
  
    if (search) {
      conditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    console.log(typeof minPrice, minPrice);
    if (minPrice !== undefined) {
      conditions.push({ price: { gte: minPrice } });
    }
  
    if (maxPrice !== undefined) {
      conditions.push({ price: { lte: maxPrice } });
    }
  
    if (serviceId) {
      conditions.push({ serviceId });
    }
  
    if (partnerId) {
      conditions.push({ partnerId });
    }
    // console.log('Filter conditions:', JSON.stringify({ where: { AND: conditions } }, null, 2));
  
    return this.prisma.product.findMany({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      include: {
        service: true,
      },
    });
    
  }
  


  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const { specs, ...productData } = dto;
  
    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        specs: specs
          ? {
              update: specs,
            }
          : undefined,
      },
      include: {
        specs: true, // optional: return updated specs
      },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  async findByService(serviceId: string) {
    return this.prisma.product.findMany({
      where: { serviceId },
    });
  }
}

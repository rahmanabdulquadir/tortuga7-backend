import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateServiceDto } from './update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        products: {
          include: {
            specs: true, // 👈 this is the missing part
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.prisma.service.findUnique({ where: { id } });
  
    if (!service) {
      throw new NotFoundException('Service not found');
    }
  
    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

async remove(id: string) {
  const service = await this.prisma.service.findUnique({ where: { id } });

  if (!service) {
    throw new NotFoundException('Service not found');
  }

  await this.prisma.service.delete({ where: { id } });

  return {
    success: true,
    message: 'Service deleted successfully',
  };
}

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './create-service.dto';
import { UpdateServiceDto } from './update-service.dto';


@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: { products: true },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    const exists = await this.prisma.service.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Service not found');

    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.service.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Service not found');

    return this.prisma.service.delete({ where: { id } });
  }
}

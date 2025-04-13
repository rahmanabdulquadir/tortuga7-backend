// src/modules/specs/specs.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpecsDto } from './create-specs.dto';
import { UpdateSpecsDto } from './update-specs.dto';


@Injectable()
export class SpecsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSpecsDto) {
    return this.prisma.specs.create({ data: dto });
  }

  async findAll() {
    return this.prisma.specs.findMany({
      include: { product: true },
    });
  }

  async findOne(id: string) {
    const specs = await this.prisma.specs.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!specs) throw new NotFoundException('Specs not found');
    return specs;
  }

  async update(id: string, dto: UpdateSpecsDto) {
    return this.prisma.specs.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.specs.delete({ where: { id } });
  }
}

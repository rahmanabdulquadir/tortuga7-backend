import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerDto } from './create-partner.dto';
import { UpdatePartnerDto } from './update-partner.dto';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePartnerDto) {
    return this.prisma.partner.create({ data: dto });
  }

  findAll() {
    return this.prisma.partner.findMany({
      orderBy: { createdAt: 'desc' },
      include: { products: true },
    });
  }

  findOne(id: string) {
    return this.prisma.partner.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async findProductsByPartner(partnerId: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id: partnerId },
      include: { products: true },
    });
  
    if (!partner) throw new NotFoundException('Partner not found');
  
    return partner.products;
  }

  async update(id: string, dto: UpdatePartnerDto) {
    const exists = await this.prisma.partner.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Partner not found');
    return this.prisma.partner.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.partner.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Partner not found');
    return this.prisma.partner.delete({ where: { id } });
  }
}

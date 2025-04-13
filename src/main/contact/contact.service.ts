import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './create-contact.dto';
import { UpdateContactDto } from './update-contact.dto';


@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateContactDto) {
    return this.prisma.contact.create({ data: dto });
  }

  findAll() {
    return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateContactDto) {
    const exists = await this.prisma.contact.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contact not found');
    return this.prisma.contact.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.contact.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contact not found');
    return this.prisma.contact.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsultantDto } from './create-consultant.dto';


@Injectable()
export class ConsultantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConsultantDto: CreateConsultantDto) {
    return this.prisma.consultant.create({
      data: {
        ...createConsultantDto,
        preferredDate: new Date(createConsultantDto.preferredDate),
      },
    });
  }

  async findAll() {
    return this.prisma.consultant.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.consultant.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return this.prisma.consultant.delete({ where: { id } });
  }
}

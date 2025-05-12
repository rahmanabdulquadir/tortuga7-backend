// services/booking.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBookingDto) {
    return this.prisma.booking.create({ data });
  }

  findAll() {
    return this.prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  delete(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}

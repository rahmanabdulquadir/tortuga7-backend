// booking.module.ts
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

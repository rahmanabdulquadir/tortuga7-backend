import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServicesController } from './service.controller';
import { ServicesService } from './service.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
  exports: [ServicesService],
})
export class ServiceModule {}

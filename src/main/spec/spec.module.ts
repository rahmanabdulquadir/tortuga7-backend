import { Module } from '@nestjs/common';
import { SpecService } from './spec.service';
import { SpecController } from './spec.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [SpecController],
  providers: [SpecService, PrismaService],
})
export class SpecModule {}

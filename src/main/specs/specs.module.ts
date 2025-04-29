// src/modules/specs/specs.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [SpecsController],
  providers: [SpecsService, PrismaService],
})
export class SpecsModule {}

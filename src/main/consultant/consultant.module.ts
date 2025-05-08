import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { ConsultantController } from './consultant.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [ConsultantController],
  providers: [ConsultantService, PrismaService],
})
export class ConsultantModule {}

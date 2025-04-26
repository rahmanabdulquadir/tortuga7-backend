// src/modules/custom-server-build/custom-server-build.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CustomServerBuildService } from './custom-server-build.service';
import { CustomServerBuildController } from './custom-server-build.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CustomServerBuildController],
  providers: [CustomServerBuildService],
})
export class CustomServerBuildModule {}
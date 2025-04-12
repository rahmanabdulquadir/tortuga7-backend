// src/blog/blog.module.ts

import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
})
export class BlogModule {}

// src/blog/blog.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './create-blog.dto';
import { UpdateBlogDto } from './update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBlogDto) {
    return this.prisma.blog.create({ data: dto });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [blogs, total] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.blog.count(),
    ]);

    return {
      data: blogs,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateBlogDto) {
    const exists = await this.prisma.blog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Blog not found');
    return this.prisma.blog.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.blog.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Blog not found');
    return this.prisma.blog.delete({ where: { id } });
  }
}

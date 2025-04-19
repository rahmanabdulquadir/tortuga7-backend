// src/modules/item/item.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './create-item.dto';

import { slugify } from 'transliteration';


@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany({
      include: { service: true },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.item.findUnique({
      where: { slug },
      include: { service: true },
    });
  }

  async create(dto: CreateItemDto) {
    const baseSlug = slugify(dto.title).toLowerCase();
    let slug = baseSlug;
    let suffix = 1;

    // check for slug uniqueness and increment suffix if needed
    while (await this.prisma.item.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix}`;
      suffix++;
    }

    return this.prisma.item.create({
      data: {
        ...dto,
        slug, // use auto-generated unique slug
      },
    });
  }
}

// src/modules/item/item.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll() {
    return this.itemService.findAll();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get item by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.itemService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  create(@Body() dto: CreateItemDto) {
    return this.itemService.create(dto);
  }
}
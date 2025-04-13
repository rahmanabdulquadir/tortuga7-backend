// src/modules/specs/specs.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecsService } from './specs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpecsDto } from './create-specs.dto';
import { UpdateSpecsDto } from './update-specs.dto';

@ApiTags('Specs')
@Controller('specs')
export class SpecsController {
  constructor(private readonly specsService: SpecsService) {}

  @Post()
  create(@Body() dto: CreateSpecsDto) {
    return this.specsService.create(dto);
  }

  @Get()
  findAll() {
    return this.specsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSpecsDto) {
    return this.specsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specsService.remove(id);
  }
}

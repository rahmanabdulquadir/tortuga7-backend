import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecService } from './spec.service';
import { CreateSpecDto } from './create-spec.dto';
import { UpdateSpecDto } from './update-spec.dto';


@Controller('specs')
export class SpecController {
  constructor(private readonly specService: SpecService) {}

  @Post()
  create(@Body() createSpecDto: CreateSpecDto) {
    return this.specService.create(createSpecDto);
  }

  @Get()
  findAll() {
    return this.specService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecDto: UpdateSpecDto) {
    return this.specService.update(id, updateSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specService.remove(id);
  }
}

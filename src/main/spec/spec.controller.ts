import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecService } from './spec.service';
import { CreateSpecDto } from './create-spec.dto';
import { UpdateSpecDto } from './update-spec.dto';
// import { AddSpecDataDto } from './add-spec-data.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AddSpecDataDto } from './add-spec-data.dto';


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

  // src/spec/spec.controller.ts
  @Post(':id/data')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: { type: 'string' },
      example: { RAM: '128GB DDR5 ECC' },
    },
  })
  async addDataToSpec(
    @Param('id') id: string,
    @Body() body: Record<string, string>,
  ) {
    return this.specService.addDataToSpec(id, body);
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

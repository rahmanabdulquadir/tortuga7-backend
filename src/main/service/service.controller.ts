import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { ServicesService } from './service.service';
import { CreateServiceDto } from './create-service.dto';
import { UpdateServiceDto } from './update-service.dto';
  
  @ApiTags('Services')
  @Controller('services')
  export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}
  
    @Post()
    create(@Body() dto: CreateServiceDto) {
      return this.servicesService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.servicesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.servicesService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
      return this.servicesService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.servicesService.remove(id);
    }
  }
  
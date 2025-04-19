// import {
//     Controller,
//     Get,
//     Post,
//     Body,
//     Patch,
//     Param,
//     Delete,
//   } from '@nestjs/common';
//   import { ApiTags } from '@nestjs/swagger';
// import { ServicesService } from './service.service';
// import { CreateServiceDto } from './create-service.dto';
// import { UpdateServiceDto } from './update-service.dto';
  
//   @ApiTags('Services')
//   @Controller('services')
//   export class ServicesController {
//     constructor(private readonly servicesService: ServicesService) {}
  
//     @Post()
//     create(@Body() dto: CreateServiceDto) {
//       return this.servicesService.create(dto);
//     }
  
//     @Get()
//     findAll() {
//       return this.servicesService.findAll();
//     }
  
//     @Get(':id')
//     findOne(@Param('id') id: string) {
//       return this.servicesService.findOne(id);
//     }
  
//     @Patch(':id')
//     update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
//       return this.servicesService.update(id, dto);
//     }
  
//     @Delete(':id')
//     remove(@Param('id') id: string) {
//       return this.servicesService.remove(id);
//     }
//   }




import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }
}
  
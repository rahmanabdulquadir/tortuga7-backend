import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

// @ApiTags('Services')
// @Controller('services')
// export class ServiceController {
//   constructor(private readonly serviceService: ServiceService) {}

//   @Get()
//   @ApiOperation({ summary: 'Get all services' })
//   findAll() {
//     return this.serviceService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get service by ID' })
//   findOne(@Param('id') id: string) {
//     return this.serviceService.findOne(id);
//   }

//   @Post()
//   @ApiOperation({ summary: 'Create a new service' })
//   create(@Body() dto: CreateServiceDto) {
//     return this.serviceService.create(dto);
//   }
// }
  




@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Delete(':id')
remove(@Param('id') id: string) {
  return this.serviceService.remove(id);
}
}



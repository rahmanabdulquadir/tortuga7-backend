import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ConsultantService } from './consultant.service';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateConsultantDto } from './create-consultant.dto';
  
  @ApiTags('Consultants')
  @Controller('consultants')
  export class ConsultantController {
    constructor(private readonly consultantService: ConsultantService) {}
  
    @Post()
    @ApiOperation({ summary: 'Request a consultation' })
    @ApiResponse({ status: 201, description: 'Consultation request created' })
    async create(@Body() dto: CreateConsultantDto) {
      return this.consultantService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all consultation requests' })
    async findAll() {
      return this.consultantService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get one consultation request' })
    async findOne(@Param('id') id: string) {
      return this.consultantService.findOne(id);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a consultation request' })
    async remove(@Param('id') id: string) {
      return this.consultantService.remove(id);
    }
  }
  
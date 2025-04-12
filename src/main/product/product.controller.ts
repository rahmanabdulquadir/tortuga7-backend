import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Post()
    create(@Body() dto: CreateProductDto) {
      return this.productService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.productService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
      return this.productService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.productService.remove(id);
    }
  
    @Get('/by-service/:serviceId')
    findByService(@Param('serviceId') serviceId: string) {
      return this.productService.findByService(serviceId);
    }
  }
  
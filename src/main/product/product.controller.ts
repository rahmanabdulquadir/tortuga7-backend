import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    BadRequestException,
    Patch,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
  
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
  
  
    // @Get()
    // async findFiltered(
    //   @Query('serviceId') serviceId?: string,
    //   @Query('filters') filtersRaw?: string,
    // ) {
    //   let filters: Record<string, string> | undefined;
  
    //   try {
    //     filters = filtersRaw ? JSON.parse(filtersRaw) : undefined;
    //   } catch (e) {
    //     throw new BadRequestException('Invalid filters format');
    //   }
  
    //   return this.productService.findAllFiltered({ serviceId, filters });
    // }
  
    // ✅ New route: GET /products/search-by-spec?value=SSG-542B-E1CR60
    @Get('/search-by-spec')
    async findBySpecValue(
      @Query('value') value: string,
      @Query('serviceId') serviceId?: string,
    ) {
      if (!value) {
        throw new BadRequestException('Missing value query parameter');
      }
  
      return this.productService.findAllBySpecValue(value, serviceId);
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
  }
  
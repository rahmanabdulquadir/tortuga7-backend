import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { QueryProductsDto } from './query-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateProductDto,
  ) {
    if (dto.filters && typeof dto.filters === 'string') {
      try {
        const parsed = JSON.parse(dto.filters);
        dto.filters = Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        throw new Error(`Invalid JSON format for filters: ${error.message}`);
      }
    }
  
    const uploadPromises = files.map((file) =>
      this.productService.uploadToCloudinary(file),
    );
    const imageUrls = await Promise.all(uploadPromises);
  
    return this.productService.create({ ...dto, images: imageUrls });
  }
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query() query: QueryProductsDto) {
    const { page, limit, ...filters } = query;
  
    const pageNumber = page ? parseInt(page, 10) : undefined;
    const pageSize = limit ? parseInt(limit, 10) : undefined;
  
    // `filters` will contain arrays like: { cpuType: ['Intel', 'AMD'] }
    return this.productService.findAllPaginatedWithFilters(pageNumber, pageSize, filters);
  }
  @Get('/search-by-spec')
  async findBySpecValue(
    @Query('value') value: string,
    @Query('serviceId') serviceId?: string,
  ) {
    if (!value) throw new BadRequestException('Missing value query parameter');
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

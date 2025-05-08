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
    try {
      // Parse filters
      if (dto.filters && typeof dto.filters === 'string') {
        const parsed = JSON.parse(dto.filters);
        dto.filters = Array.isArray(parsed) ? parsed : [parsed];
      }

      // Parse keyFeatures
      if (dto.keyFeatures && typeof dto.keyFeatures === 'string') {
        const parsed = JSON.parse(dto.keyFeatures);
        dto.keyFeatures = Array.isArray(parsed) ? parsed : [parsed];
      }

      // Parse keyApplications
      if (dto.keyApplications && typeof dto.keyApplications === 'string') {
        const parsed = JSON.parse(dto.keyApplications);
        dto.keyApplications = Array.isArray(parsed) ? parsed : [parsed];
      }

      const uploadPromises = files.map((file) =>
        this.productService.uploadToCloudinary(file),
      );
      const imageUrls = await Promise.all(uploadPromises);

      return this.productService.create({ ...dto, images: imageUrls });
    } catch (error) {
      throw new Error(`Invalid JSON format in body: ${error.message}`);
    }
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() query: QueryProductsDto) {
    const { page, limit, search, ...filters } = query;

    const pageNumber = page ? parseInt(page, 10) : undefined;
    const pageSize = limit ? parseInt(limit, 10) : undefined;

    return this.productService.findAllPaginatedWithFilters(
      pageNumber,
      pageSize,
      filters,
      search,
    );
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

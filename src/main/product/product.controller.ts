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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateProductDto,
  ) {
    const imageUrls = files.map((file) => `/uploads/products/${file.filename}`);
    // Ensure filters is parsed if sent as a string
    if (dto.filters && typeof dto.filters === 'string') {
      try {
        dto.filters = JSON.parse(dto.filters);
      } catch (error) {
        throw new Error('Invalid JSON format for filters');
      }
    }
    return this.productService.create({ ...dto, images: imageUrls });
  }
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(@Query() query: QueryProductsDto) {
    const { page, limit, ...filters } = query;
    const pageNumber = page ? parseInt(page.toString()) : undefined;
    const pageSize = limit ? parseInt(limit.toString()) : undefined;

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
  //   return this.productService.update(id, dto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

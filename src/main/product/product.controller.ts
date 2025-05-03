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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { QueryProductsDto } from './query-products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


@Post()
@UseInterceptors(
  FilesInterceptor('images', 10, {  // 'images' is the form field name, 10 is the max number of files allowed
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

async create(
  @UploadedFiles() files: Express.Multer.File[],  // Accept multiple files
  @Body() dto: CreateProductDto,
) {
  // Generate URLs for all uploaded images
  const imageUrls = files.map(file => `/uploads/products/${file.filename}`);
  return this.productService.create({ ...dto, images: imageUrls });
}


// @Get()
// @ApiQuery({ name: 'page', required: false, type: Number })
// @ApiQuery({ name: 'limit', required: false, type: Number })
// @ApiQuery({ name: 'brandName', required: false, type: String })
// @ApiQuery({ name: 'generation', required: false, type: String })
// @ApiQuery({ name: 'cpuType', required: false, type: String })
// findAll(@Query() query: QueryProductsDto) {
//   const { page, limit, ...filters } = query;
//   const pageNumber = page ? parseInt(page) : undefined;
//   const pageSize = limit ? parseInt(limit) : undefined;

//   return this.productService.findAllPaginated(pageNumber, pageSize, filters);
// }

  @Get()
  // @ApiQuery({ name: 'filters', type: QueryProductsDto })
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

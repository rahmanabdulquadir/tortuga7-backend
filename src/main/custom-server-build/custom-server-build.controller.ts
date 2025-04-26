import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomServerBuildService } from './custom-server-build.service';
import { CreateCustomServerBuildDto } from './create-custom-server-build.dto';
import { UpdateCustomServerBuildDto } from './update-custom-server-build.dto';


@ApiTags('Custom Server Build')
@Controller('custom-server-build')
export class CustomServerBuildController {
  constructor(private readonly service: CustomServerBuildService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Custom Server Build product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  create(@Body() data: CreateCustomServerBuildDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Custom Server Build products with filters' })
  @ApiResponse({ status: 200, description: 'List of products.' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('productModel') productModel?: string,
  ) {
    return this.service.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      productModel,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a single product by slug' })
  @ApiResponse({ status: 200, description: 'Product details.' })
  findOne(@Param('slug') slug: string) {
    return this.service.findOne(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Update a product by slug' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  update(@Param('slug') slug: string, @Body() data: UpdateCustomServerBuildDto) {
    return this.service.update(slug, data);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'Delete a product by slug' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  delete(@Param('slug') slug: string) {
    return this.service.delete(slug);
  }
}

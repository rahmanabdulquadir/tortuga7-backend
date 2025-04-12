import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ example: 'Updated Product Name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({ example: 30 })
  price?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/updated-image.jpg',
  })
  image?: string;

  @ApiPropertyOptional({ example: 'updated-service-id' })
  serviceId?: string;
}

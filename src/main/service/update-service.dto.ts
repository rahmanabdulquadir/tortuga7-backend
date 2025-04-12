import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional({ example: 'Updated Service Name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/updated-image.jpg',
  })
  image?: string;
}

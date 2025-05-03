import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSpecDto {
  @ApiProperty({
    example: 'Dimension',
    description: 'Title of the spec group',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'This section includes all the technical details.',
    description: 'Optional description of the spec group',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Array of key-value specification objects',
    type: [Object],
    example: [
      { Height: '180cm' },
      { Width: '80cm' },
    ],
  })
  @IsArray() // ✅ This is the key
  @Type(() => Object) // ✅ Forces proper transformation of each item
  data: Record<string, string>[];

  @ApiPropertyOptional({
    example: 'product-uuid',
    description: 'Optional product ID',
  })
  @IsOptional()
  @IsString()
  productId?: string;
}

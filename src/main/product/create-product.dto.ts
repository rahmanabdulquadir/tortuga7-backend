import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class FilterDto {
  @ApiProperty({ description: 'Filter name (e.g., memorySlots)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Filter value (e.g., 4, electronics)' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productModel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [FilterDto], description: 'List of filters (e.g., [{ name: "memorySlots", value: "4" }])', required: false })
  @IsOptional()
  @IsArray({ message: 'filters must be an array' })
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          throw new Error('filters must be an array');
        }
        return parsed;
      } catch (error) {
        throw new Error(`Invalid JSON format for filters: ${error.message}`);
      }
    }
    if (!Array.isArray(value)) {
      throw new Error('filters must be an array');
    }
    return value;
  })
  filters?: FilterDto[];

  @ApiProperty({ type: [String], description: 'List of key applications' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  keyApplications: string[];

  @ApiProperty({ type: [String], description: 'List of key features' })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  keyFeatures: string[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Multiple image files',
    required: false,
  })
  @IsOptional()
  @IsArray()
  images: any[];

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  available: boolean;

  @ApiProperty({ description: 'UUID of the associated service', required: false })
  @IsOptional()
  @IsUUID('4', { message: 'serviceId must be a valid UUID' })
  serviceId?: string;
}
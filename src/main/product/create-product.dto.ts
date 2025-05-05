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
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'FiltersValidator', async: false })
class FiltersValidator implements ValidatorConstraintInterface {
  validate(filters: any[], args: ValidationArguments) {
    if (!filters || filters.length === 0) {
      return true; // Allow empty or undefined if optional
    }
    return filters.every((filter, index) => {
      if (!filter || typeof filter !== 'object' || !filter.name || !filter.value) {
        throw new Error(`Filter at index ${index} must have non-empty name and value (got: ${JSON.stringify(filter)})`);
      }
      return typeof filter.name === 'string' && filter.name.trim() !== '' && typeof filter.value === 'string' && filter.value.trim() !== '';
    });
  }
}

class FilterDto {
  @ApiProperty({ description: 'Filter name (e.g., cpuType)', example: 'cpuType' })
  @IsString()
  @IsNotEmpty({ message: 'Filter name must not be empty' })
  name: string;

  @ApiProperty({ description: 'Filter value (e.g., intel® Xeon® Gold 6338)', example: 'intel® Xeon® Gold 6338' })
  @IsString()
  @IsNotEmpty({ message: 'Filter value must not be empty' })
  value: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'UltraServer' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 'xtv-15' })
  @IsString()
  @IsNotEmpty()
  productModel: string;

  @ApiProperty({ example: 'Den' })
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @ApiProperty({ example: 'rgw-wr' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'stringqerewefwreg' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: [FilterDto],
    description: 'List of filters (e.g., [{ name: "cpuType", value: "intel® Xeon® Gold 6338" }] or { name: "cpuType", value: "intel® Xeon® Gold 6338" })',
    required: false,
    example: [{ name: 'cpuType', value: 'intel® Xeon® Gold 6338' }],
  })
  @IsOptional()
  @IsArray({ message: 'filters must be an array' })
  @Validate(FiltersValidator, { message: 'Invalid filters format' })
  @Type(() => FilterDto)
  @Transform(({ value }) => {
    // console.log('Raw filters input:', value);
    if (value === undefined || value === null) {
      return undefined;
    }
    let result;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        result = Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        throw new Error(`Invalid JSON format for filters: ${error.message} (input: "${value}")`);
      }
    } else {
      result = Array.isArray(value) ? value : [value];
    }
    // console.log('Transformed filters:', result);
    return result;
  })
  filters?: FilterDto[];

  @ApiProperty({ type: [String], description: 'List of key applications', example: ['gaming', 'work'] })
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((v) => v.trim()) : value,
  )
  keyApplications: string[];

  @ApiProperty({ type: [String], description: 'List of key features', example: ['fast processor', 'long battery'] })
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

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  available: boolean;

  @ApiProperty({ description: 'UUID of the associated service', required: false, example: '053ef36a-898a-435e-a185-4f5691024e44' })
  @IsOptional()
  @IsUUID('4', { message: 'serviceId must be a valid UUID' })
  serviceId?: string;
}
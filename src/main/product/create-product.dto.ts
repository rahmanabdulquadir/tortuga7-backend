// src/product/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSpecsDto } from '../specs/create-specs.dto';


export class CreateProductDto {
  @ApiProperty({ example: 'Tire Wash' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Detailed cleaning of all tires' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'service-id-here' })
  @IsString()
  serviceId: string;

  @ApiPropertyOptional({ example: 'partner-id-here' })
  @IsOptional()
  @IsString()
  partnerId?: string;

  @ApiPropertyOptional({ type: () => CreateSpecsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSpecsDto)
  specs?: CreateSpecsDto;
}

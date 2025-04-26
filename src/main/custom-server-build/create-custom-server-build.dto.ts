import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomServerBuildDto {
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
  @IsOptional()
  description?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  keyApplications?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  keyFeatures?: string[];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @IsArray()
  @IsOptional()
  specifications?: any[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsBoolean()
  available: boolean;
}

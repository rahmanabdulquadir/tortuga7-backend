import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductsDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  cpuType?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  generation?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  memorySlots?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  totalPower?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  @IsString({ each: true })
  storageType?: string[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryProductsDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cpuType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  generation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memorySlots?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  totalPower?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  storageType?: string;
}

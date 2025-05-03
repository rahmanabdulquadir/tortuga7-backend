import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class QueryProductsDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  productModel?: string;
 
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  brandName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  generation?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  cpuType?: string;
}

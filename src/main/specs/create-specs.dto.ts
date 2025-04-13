// src/modules/specs/dto/create-specs.dto.ts

import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpecsDto {
  @ApiPropertyOptional()
  @IsString() @IsOptional()
  productSKUs?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  motherboard?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  processor?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  systemMemory?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  onBoardDevices?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  inputOutput?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  systemBIOS?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  management?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  security?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  pcHealthMonitoring?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  chassis?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  dimensionsAndWeight?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  expansionSlots?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  driveBaysStorage?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  systemCooling?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  powerSupply?: string;

  @ApiPropertyOptional()
  @IsString() @IsOptional()
  operatingEnvironment?: string;

  @ApiPropertyOptional({ description: 'Product ID to link with this specs' })
  @IsString()
  productId: string;
}

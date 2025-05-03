import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SpecItem {
  @ApiProperty({ example: 'Power' })
  @IsString()
  key: string;

  @ApiProperty({ example: '200W' })
  @IsString()
  value: string;
}

export class CreateSpecDto {
  @ApiProperty({
    example: 'Technical Specifications',
    description: 'Title of the spec group',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'This section includes all the technical details about the product.',
    description: 'Optional description of the spec group',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'An array of key-value pair objects representing specifications',
    example: [
      { key: 'Power', value: '200W' },
      { key: 'Voltage', value: '220V' },
    ],
    type: [SpecItem],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecItem)
  data: SpecItem[];

  @ApiPropertyOptional({
    example: 'c40c768b-3a1d-4b90-8b2f-fdb8a1fbd123',
    description: 'Optional reference to a product by its ID',
  })
  @IsOptional()
  @IsString()
  productId?: string;
}

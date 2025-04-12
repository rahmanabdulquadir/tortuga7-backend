import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Interior Cleaning' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Deep cleaning for interior areas', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/interior-cleaning.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;
}

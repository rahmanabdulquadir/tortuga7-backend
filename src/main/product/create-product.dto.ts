import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Tire Wash' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Detailed cleaning of all tires', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'service-id-here' })
  @IsString()
  serviceId: string;
}

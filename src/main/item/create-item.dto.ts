// src/modules/item/dto/create-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'NVIDIA A100 80GB Server' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'nvidia-a100-80gb-server' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Enterprise-grade AI compute server with 4x NVIDIA A100 GPUs.' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['Deep learning', 'Scientific simulation'] })
  @IsArray()
  keyApplications: string[];

  @ApiProperty({ example: ['4x A100 GPUs', '2TB DDR5 RAM'] })
  @IsArray()
  keyFeatures: string[];

  @ApiProperty({
    example: {
      CPU: 'AMD EPYC 9654',
      GPU: '4x A100 80GB',
      RAM: '2048 GB DDR5 ECC',
      Storage: '2x 4TB NVMe SSD'
    }
  })
  @IsObject()
  specifications: Record<string, string>;

  @ApiProperty({ example: ['https://cdn.example.com/item1.jpg'] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ example: '3f23a23f-2432-48bc-94ad-0d1a95c125b2' })
  @IsUUID()
  serviceId: string;
}

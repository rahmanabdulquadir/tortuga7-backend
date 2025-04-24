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
      CPU: 'Intel Core i7-10700',
      GPU: 'NVIDIA Quadro RTX 4000',
      RAM: '2048 GB DDR5 ECC',
      chipset: "Intel W480",
      Storage: '256GB M.2 NVMe',
      memory: "32GB DDR4-3200",
      weight: "8.2 kg (18.03 lb) (Typical)",
      network: "Onboard -  Intel® I219LM PCIe GbE Controller (Intel® vPro™ with Intel® AMT 12.0)",
      dimensions: "356 mm x 169 mm x 385 mm (14.0 x 6.7 x 15.2 in)",
      rackMount: "5U, kit not sold by Userful (HP 2A8Y5AA)",
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

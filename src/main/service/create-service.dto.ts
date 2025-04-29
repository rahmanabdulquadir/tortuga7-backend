import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'GPU rental and AI compute' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'High-performance GPU servers for AI training and inference tasks.' })
  @IsString()
  description: string;
}

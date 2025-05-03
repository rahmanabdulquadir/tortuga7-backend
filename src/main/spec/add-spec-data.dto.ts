import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

export class AddSpecDataDto {
  [key: string]: string;
}
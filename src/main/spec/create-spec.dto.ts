import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateSpecDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsObject({ each: true })
  data: object[]; // array of objects
}

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

//   @ApiProperty()
//   @IsString()
//   author: string;

  @ApiProperty()
  @IsString()
  finalWords: string; // ✅ Add this
}

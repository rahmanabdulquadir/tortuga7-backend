import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsDateString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateConsultantDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;
  
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    company: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @ApiProperty({ description: 'Preferred date in ISO format' })
    @IsDateString()
    preferredDate: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    preferredTime: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;
  }
  
// dto/create-booking.dto.ts
import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  productName: string;

  @IsInt()
  quantity: number;

  @IsString()
  address: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}

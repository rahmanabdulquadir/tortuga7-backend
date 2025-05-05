import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Random' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'User' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '696969696969' })
  @IsString()
  @IsNotEmpty()
  contactNo: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}
export class ForgotPasswordDto {
  @ApiProperty()
  email: string;
}


export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  resetToken: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  password: string;

  @ApiProperty({ example: 'Random User' })
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
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
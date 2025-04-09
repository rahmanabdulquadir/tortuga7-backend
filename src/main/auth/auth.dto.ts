import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  password: string;
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
  token: string;

  @ApiProperty()
  newPassword: string;
}

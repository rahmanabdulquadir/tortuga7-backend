import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';


@ApiTags('Authentication') // Grouped in Swagger under "Authentication"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: RegisterDto) {
    return this.authService.signup(body.email, body.password, body.firstName, body.lastName, body.contactNo);
  }

  @Post('signin')
  signin(@Body() body: LoginDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.resetToken, dto.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() 
  @Post('me')
  getMe(@Req() req) {
    return req.user;
  }
}

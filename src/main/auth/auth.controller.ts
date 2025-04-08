import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtAuthGuard } from './jwt.guard';


@ApiTags('Authentication') // Grouped in Swagger under "Authentication"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: RegisterDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: LoginDto) {
    return this.authService.signin(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Enables Swagger's Bearer Token usage
  @Post('me')
  getMe(@Req() req) {
    return req.user;
  }
}

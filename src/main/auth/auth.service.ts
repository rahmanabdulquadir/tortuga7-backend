import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    // Log the JWT_SECRET value to ensure it's being read correctly
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined!');
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }
    console.log('JWT_SECRET inside AuthService:', jwtSecret);
  }

  async signup(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(email, hashedPassword, name);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create the payload for the JWT token
    const payload = { sub: user.id, role: user.role };
    console.log('Signing with payload:', payload);

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined!');
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    // Ensure we pass signOptions if needed
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    console.log(accessToken)
    return { access_token: accessToken };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExp = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes from now

    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExp },
    });

    await this.mailService.sendResetPasswordEmail(email, resetToken);
    return { message: 'Reset link sent to your email.' };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken,
        resetTokenExp: {
          gte: new Date(), // Ensure token hasn't expired
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return { message: 'Password reset successfully' };
  }
}

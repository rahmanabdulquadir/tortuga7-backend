import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signup(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(email, hashedPassword);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExp = new Date(Date.now() + 1000 * 60 * 10); // valid for 10 min

    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExp },
    });

    // Normally you'd send this via email
    console.log(`📨 Password reset token for ${email}: ${resetToken}`);

    return { message: 'Reset token generated and sent to email (check server log).' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExp: { gte: new Date() }, // not expired
      },
    });

    if (!user) throw new BadRequestException('Invalid or expired token');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return { message: 'Password reset successful' };
  }
}

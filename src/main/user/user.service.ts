import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, firstName: string, lastName: string, contactNo: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    return this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        contactNo,
        role: 'CLIENT',
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

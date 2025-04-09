// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const adminEmail = 'admin@tortuga.com';
    const adminPassword = 'admin123';

    const existingAdmin = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await this.prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created on startup.');
  }
}

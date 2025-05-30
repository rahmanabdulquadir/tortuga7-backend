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
    const adminFirstName = "Mr.";
    const adminLastName = "Tortuga"
    const adminContactNo = "11111111"

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
        firstName: adminFirstName,
        lastName: adminLastName,
        contactNo: adminContactNo,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created on startup.');
  }
}

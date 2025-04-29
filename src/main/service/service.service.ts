

// import { Injectable } from '@nestjs/common';
// import { CreateServiceDto } from './create-service.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ServiceService {
//   constructor(private prisma: PrismaService) {}

//   findAll() {
//     return this.prisma.service.findMany({
//       include: { items: true },
//     });
//   }

//   findOne(id: string) {
//     return this.prisma.service.findUnique({
//       where: { id },
//       include: { items: true },
//     });
//   }

//   create(dto: CreateServiceDto) {
//     return this.prisma.service.create({
//       data: dto,
//     });
//   }
// }


import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const services = await this.prisma.service.findMany({
      include: { products: true },
    });

    const serviceTitles = services.map(service => service.title);

    return {
      success: true,
      serviceTitles,
      services,
    };
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: dto,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ServiceService {
//   constructor(private prisma: PrismaService) {}

//   async findAll() {
//     const services = await this.prisma.service.findMany({
//       include: { products: true },
//     });

//     const serviceTitles = services.map(service => service.title);

//     return {
//       success: true,
//       serviceTitles,
//       services,
//     };
//   }

//   findOne(id: string) {
//     return this.prisma.service.findUnique({
//       where: { id },
//       include: { products: true },
//     });
//   }

//   create(dto: CreateServiceDto) {
//     return this.prisma.service.create({
//       data: dto,
//     });
//   }
// }



@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  // src/service/service.service.ts

async remove(id: string) {
  const service = await this.prisma.service.findUnique({ where: { id } });

  if (!service) {
    throw new NotFoundException('Service not found');
  }

  await this.prisma.service.delete({ where: { id } });

  return {
    success: true,
    message: 'Service deleted successfully',
  };
}

}

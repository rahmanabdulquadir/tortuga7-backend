import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpecDto } from './create-spec.dto';
import { UpdateSpecDto } from './update-spec.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class SpecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecDto: CreateSpecDto) {
    const { productId, ...rest } = createSpecDto;
    
  
    const spec = await this.prisma.spec.create({
      data: {
        ...rest,
        data: rest.data as unknown as Prisma.InputJsonValue,
        ...(productId && {
          product: {
            connect: { id: productId },
          },
        }),
      },
    });
  
    return { success: true, message: 'Spec created successfully', data: spec };
  }

  

  async findAll() {
    const specs = await this.prisma.spec.findMany();
    return { success: true, data: specs };
  }

  async findOne(id: string) {
    const spec = await this.prisma.spec.findUnique({ where: { id } });
    return { success: true, data: spec };
  }

  async addDataToSpec(id: string, newItem: Record<string, string>) {
    const spec = await this.prisma.spec.findUnique({ where: { id } });
  
    if (!spec || !Array.isArray(spec.data) || typeof newItem !== 'object') {
      throw new BadRequestException('Invalid spec or new item');
    }
  
    const cleanedItem = Object.fromEntries(
      Object.entries(newItem).filter(([k, v]) => k && v)
    );
  
    const updatedData = [...spec.data, cleanedItem];
  
    const updatedSpec = await this.prisma.spec.update({
      where: { id },
      data: {
        data: updatedData as unknown as Prisma.InputJsonValue,
      },
    });
  
    return {
      success: true,
      message: 'New data added to spec successfully',
      data: updatedSpec,
    };
  }
  

  async update(id: string, updateSpecDto: UpdateSpecDto) {
    const { data, ...rest } = updateSpecDto;
  
    const spec = await this.prisma.spec.update({
      where: { id },
      data: {
        ...rest,
        ...(data && {
          data: data as unknown as Prisma.InputJsonValue,
        }),
      },
    });
  
    return { success: true, message: 'Spec updated successfully', data: spec };
  }

  async remove(id: string) {
    await this.prisma.spec.delete({ where: { id } });
    return { success: true, message: 'Spec deleted successfully' };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpecDto } from './create-spec.dto';
import { UpdateSpecDto } from './update-spec.dto';


@Injectable()
export class SpecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecDto: CreateSpecDto) {
    const spec = await this.prisma.spec.create({
      data: createSpecDto,
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

  async update(id: string, updateSpecDto: UpdateSpecDto) {
    const spec = await this.prisma.spec.update({
      where: { id },
      data: updateSpecDto,
    });
    return { success: true, message: 'Spec updated successfully', data: spec };
  }

  async remove(id: string) {
    await this.prisma.spec.delete({ where: { id } });
    return { success: true, message: 'Spec deleted successfully' };
  }
}

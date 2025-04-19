// src/modules/item/item.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [PrismaModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}

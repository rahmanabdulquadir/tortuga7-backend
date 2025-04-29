import { Module } from '@nestjs/common';
import { SpecController } from './spec.controller';
import { SpecService } from './spec.service';

@Module({
  controllers: [SpecController],
  providers: [SpecService]
})
export class SpecModule {}

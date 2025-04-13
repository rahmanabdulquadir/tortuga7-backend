import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}

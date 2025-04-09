import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './main/user/user.module';
import { SeederService } from './prisma/seeder.service';
import { MailModule } from './main/mail/mail.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MailModule],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}



import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './main/user/user.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



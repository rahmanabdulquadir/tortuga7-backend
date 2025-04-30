import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';


@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}

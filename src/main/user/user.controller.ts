// src/user/user.controller.ts
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UpdateUserDto } from './update-user.dto';


@ApiTags('Users') // ✅ Makes the controller group visible in Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' }) // ✅ Adds description in Swagger
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

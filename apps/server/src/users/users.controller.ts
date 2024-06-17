import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { FindOrCreateDto } from './dto/find-or-create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('find-or-create')
  findOrCreate(@Body() findOrCreateDto: FindOrCreateDto) {
    return this.usersService.findOrCreate(findOrCreateDto);
  }

  @Get('find-all-other-users')
  findAllOtherUsers(@Query('id') id: string) {
    return this.usersService.findAllOtherUsers(id);
  }

  @Get('find-user-by-id')
  finduserByID(@Query('id') id: string) {
    return this.usersService.findUserById(id);
  }
}

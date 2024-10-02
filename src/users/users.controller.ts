import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, response } from 'express';

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("signup")
    signup(
        @Body() createUserDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.usersService.signup(createUserDto, res);
    }

    @Get("activate/:activation_link")
    async activateUser(@Param("activation_link") activation_link: string) {
        return this.usersService.activateUser(activation_link);
  }
  
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}

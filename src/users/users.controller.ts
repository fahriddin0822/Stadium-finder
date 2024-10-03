import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    Req,
    BadRequestException,
    UseGuards,
    HttpStatus,
    HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request, Response } from "express";
import { UserGuard } from "../guards/user.guard";
import { SignInUserDto } from "./dto/signInUser.dto";
import { CookieGetter } from "../decorators/cookie_getter.decorator";

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

    @HttpCode(200)
    @Post("signin")
    async signIn(
        @Body() signInUserDto: SignInUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.usersService.signIn(signInUserDto, res);
        return result;
    }

    @HttpCode(200)
    @Post("signout")
    signOut(
        @CookieGetter("refresh_token") refreshToken: string,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.usersService.signout(refreshToken, res);
    }

    @UseGuards(UserGuard)
    @Get("all")
    findAll() {
        return this.usersService.findAll();
    }

    @HttpCode(200)
    @Post(":id/refresh")
    refresh(
        @Param("id") id: number,
        @CookieGetter("refresh_token") refreshToken: string,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.usersService.refreshTokens(+id, refreshToken, res);
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

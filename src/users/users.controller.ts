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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request, Response, response } from "express";

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
    async activateUser(
        @Param("activation_link") activation_link: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const refreshToken = req.cookies["refresh_token"];

        if (!refreshToken) {
            throw new BadRequestException(
                "No refresh token found in the cookies."
            );
        }

        const result = await this.usersService.activateUser(
            refreshToken,
            activation_link
        );

        return res.json(result);
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

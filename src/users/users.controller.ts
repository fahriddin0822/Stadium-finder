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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request, Response, response } from "express";
import { UserGuard } from "../guards/user.guard";

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

    @Post("signin")
    async signIn(
        @Body() credentials: { email: string; password: string },
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.usersService.signIn(
            credentials.email,
            credentials.password
        );
        res.cookie("refresh_token", result.refresh_token, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TIME_MS,
        });
        return res.json({ access_token: result.access_token });
    }

    @Post("signout")
    signOut(@Res() res: Response) {
        res.clearCookie("refresh_token"); // Clear the refresh token from the cookie
        return res.json({ message: "Signed out successfully" });
    }

    @UseGuards(UserGuard)
    @Get('all')
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

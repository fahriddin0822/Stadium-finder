import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    BadRequestException,
    Req,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Request, Response } from "express";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post("create")
    create(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.create(createAdminDto);
    }

    @Post("signup")
    signup(
        @Body() createUserDto: CreateAdminDto,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.adminService.signup(createUserDto, res);
    }

    @Get("activate/:activation_link")
    async activateAdmin(
        @Param("activation_link") activation_link: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const result = await this.adminService.activateAdmin(activation_link);

        return res.json(result);
    }

    @Post("signin")
    async signIn(
        @Body() credentials: { email: string; password: string },
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.adminService.signIn(
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
  
  

    @Get("all")
    findAll() {
        return this.adminService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.adminService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
        return this.adminService.update(+id, updateAdminDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.adminService.remove(+id);
    }
}

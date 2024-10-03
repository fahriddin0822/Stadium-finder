import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import * as uuid from "uuid";
import { Response } from "express";

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin) private adminModel: typeof Admin,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}
    create(createAdminDto: CreateAdminDto) {
        return this.adminModel.create(createAdminDto);
    }

    async signup(createAdminDto: CreateAdminDto, res: Response) {
        const admin = await this.adminModel.findOne({
            where: { email: createAdminDto.email },
        });

        if (admin) {
            throw new BadRequestException("This admin is exist.");
        }

        const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

        const newAdmin = await this.adminModel.create({
            ...createAdminDto,
            hashed_password,
        });

        const tokens = await this.generateTokens(newAdmin);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const activation_link = uuid.v7();
        const updatedAdmin = await this.adminModel.update(
            {
                hashed_refresh_token,
                activation_link,
            },
            {
                where: { id: newAdmin.id },
                returning: true,
            }
        );
        res.cookie("refresh_token", tokens.refresh_token, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TIME_MS,
        });

        try {
            await this.mailService.sendMailAdmin(updatedAdmin[1][0]);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Error on sending e-mail");
        }

        const response = {
            message: "Admin registered.",
            admin: updatedAdmin[1][0],
            access_token: tokens.access_token,
        };
        return response;
    }

    async activateAdmin(activation_link: string) {
        const admin = await this.adminModel.findOne({
            where: { activation_link },
        });

        if (!admin) {
            throw new BadRequestException("Invalid activation link.");
        }

        admin.is_active = true;
        await admin.save();

        return {
            message: "Admin successfully activated",
            admin,
        };
    }

    async signIn(email: string, password: string) {
        const admin = await this.adminModel.findOne({ where: { email } });

        if (
            !admin ||
            !(await bcrypt.compare(
                password,
                admin.hashed_password
            ))
        ) {
            throw new BadRequestException("Invalid email or password");
        }

        const tokens = await this.generateTokens(admin);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        await this.adminModel.update(
            { hashed_refresh_token },
            { where: { id: admin.id } }
        );
        return tokens;
    }

    async refreshTokens(refreshToken: string) {
        const admin = await this.validateRefreshToken(refreshToken);

        const newTokens = await this.generateTokens(admin);

        return newTokens;
    }

    private async validateRefreshToken(refreshToken: string) {
        const admin = await this.adminModel.findOne({
            where: { hashed_refresh_token: refreshToken },
        });

        if (!admin) {
            throw new BadRequestException("Invalid refresh token");
        }

        return admin;
    }

    findAll() {
        return this.adminModel.findAll({ include: { all: true } });
    }

    findOne(id: number) {
        return this.adminModel.findOne({
            where: { id },
            include: { all: true },
        });
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return this.adminModel.update(updateAdminDto, { where: { id } });
    }

    remove(id: number) {
        return this.adminModel.destroy({ where: { id } });
    }

    async generateTokens(admin: Admin) {
        const payload = {
            id: admin.id,
            is_active: admin.is_active,
            is_owner: admin.is_creater,
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }
}

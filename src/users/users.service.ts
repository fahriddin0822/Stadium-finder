import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private usersModel: typeof Users,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async signup(createCategoryDto: CreateUserDto, res: Response) {
        const user = await this.usersModel.findOne({
            where: { email: createCategoryDto.email },
        });

        if (user) {
            throw new BadRequestException("This user is exist.");
        }

        if (createCategoryDto.password !== createCategoryDto.confirmPassword) {
            throw new BadRequestException("Password is incorrect.");
        }

        const hashed_password = await bcrypt.hash(
            createCategoryDto.password,
            7
        );

        const newUser = await this.usersModel.create({
            ...createCategoryDto,
            hashed_password,
        });

        const tokens = await this.generateTokens(newUser);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const activation_link = uuid.v7();
        const updatedUser = await this.usersModel.update(
            {
                hashed_refresh_token,
                activation_link,
            },
            {
                where: { id: newUser.id },
                returning: true,
            }
        );
        res.cookie("refresh_token", tokens.refresh_token, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TIME_MS,
        });

        try {
            await this.mailService.sendMail(updatedUser[1][0]);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Error on sending e-mail");
        }

        const response = {
            message: "User registered.",
            user: updatedUser[1][0],
            access_token: tokens.access_token,
        };
        return response;
    }

    async activateUser(refreshToken: string, activation_link: string) {
        const user = await this.usersModel.findOne({
            where: { activation_link },
        });

        if (!user) {
            throw new BadRequestException("Invalid activation link.");
        }

        const isTokenValid = await bcrypt.compare(
            refreshToken,
            user.hashed_refresh_token
        );

        if (!isTokenValid) {
            throw new BadRequestException("Invalid refresh token.");
        }

        // Activate the user
        user.is_active = true;
        await user.save();

        return {
            message: "User successfully activated",
            user,
        };
    }

    async refreshTokens(refreshToken: string) {
        const user = await this.validateRefreshToken(refreshToken);

        const newTokens = await this.generateTokens(user);

        return newTokens;
    }

    private async validateRefreshToken(refreshToken: string) {
        const user = await this.usersModel.findOne({
            where: { hashed_refresh_token: refreshToken },
        });

        if (!user) {
            throw new BadRequestException("Invalid refresh token");
        }

        return user;
    }

    create(createUserDto: CreateUserDto) {
        return "This action adds a new user";
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async generateTokens(user: Users) {
        const payload = {
            id: user.id,
            is_active: user.is_active,
            is_owner: user.is_owner,
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

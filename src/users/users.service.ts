import {
    BadRequestException,
    ForbiddenException,
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
import { response, Response } from "express";
import { MailService } from "../mail/mail.service";
import { access, link } from "fs";
import { where } from "sequelize";
import { SignInUserDto } from "./dto/signInUser.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private usersModel: typeof Users,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async signup(createUserDto: CreateUserDto, res: Response) {
        const user = await this.usersModel.findOne({
            where: { email: createUserDto.email },
        });

        if (user) {
            throw new BadRequestException("This user is exist.");
        }

        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException("Password is incorrect.");
        }

        const hashed_password = await bcrypt.hash(createUserDto.password, 7);

        const newUser = await this.usersModel.create({
            ...createUserDto,
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

    async activateUser(activation_link: string) {
        if (!activation_link) {
            throw new BadRequestException("Activation link not found.");
        }
        const updateUser = await this.usersModel.update(
            { is_active: true },
            {
                where: {
                    activation_link: activation_link,
                    is_active: false,
                },
                returning: true,
            }
        );

        if (!updateUser[1][0]) {
            throw new BadRequestException("User already activated.");
        }

        const response = {
            message: "User activated successfully.",
            user: updateUser[1][0].is_active,
        };
        return response;
    }

    async signIn(signInUserDto: SignInUserDto, res: Response) {
        const { email, password } = signInUserDto;
        const user = await this.usersModel.findOne({ where: { email } });

        if (!user) {
            throw new BadRequestException("User not found");
        }

        if (!user.is_active) {
            throw new BadRequestException("User is not activated.");
        }

        const isMatchPass = await bcrypt.compare(
            password,
            user.hashed_password
        );

        if (!isMatchPass) {
            throw new BadRequestException("Passeord do not matched.");
        }
        const tokens = await this.generateTokens(user);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

        const updatedUser = await this.usersModel.update(
            { hashed_refresh_token },
            {
                where: { id: user.id },
                returning: true,
            }
        );

        res.cookie("refresh_token", tokens.refresh_token, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TIME_MS,
        });

        const response = {
            message: "User signed in",
            user: updatedUser[1][0],
            accessToken: tokens.access_token,
        };
        return response;
    }

    async signout(refresh_token: string, res: Response) {
        console.log("REFRESH_TOKEN_KEY", process.env.REFRESH_TOKEN_KEY);
        const userData = await this.jwtService.verify(refresh_token, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });

        if (!userData) {
            throw new ForbiddenException("User not verified");
        }

        const updateUser = await this.usersModel.update(
            {
                hashed_refresh_token: null,
            },
            {
                where: { id: userData.id },
                returning: true,
            }
        );
        res.clearCookie("refresh_token");
        const respoonse = {
            message: "User signed out successfully.",
        };
        return response;
    }

    async refreshTokens(userId: number, refresh_token: string, res: Response) {
        const decodedToken = await this.jwtService.decode(refresh_token);

        if (userId != decodedToken["id"]) {
            throw new BadRequestException("Ruxsat etilmagan");
        }

        const user = await this.usersModel.findOne({ where: { id: userId } });

        if (!user || !user.hashed_refresh_token) {
            throw new BadRequestException("User not found.");
        }

        const tokenMatch = await bcrypt.compare(
            refresh_token,
            user.hashed_refresh_token
        );

        if (!tokenMatch) {
            throw new ForbiddenException("Forbidden.");
        }

        const tokens = await this.generateTokens(user);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

        const updatedUser = await this.usersModel.update(
            {
                hashed_refresh_token,
            },
            {
                where: { id: user.id },
                returning: true,
            }
        );
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: +process.env.REFRESH_TIME_MS,
            httpOnly: true,
        });
        const response = {
            message: "User refreshed.",
            user: updatedUser[1][0],
            access_token: tokens.access_token,
        };
        return response;
    }

    async validateRefreshTokens(refreshToken: string) {
        const user = await this.usersModel.findOne({
            where: { hashed_refresh_token: refreshToken }, // Make sure this lookup is correct
        });

        if (!user) {
            throw new BadRequestException("Invalid refresh token");
        }

        const isTokenValid = await bcrypt.compare(
            refreshToken,
            user.hashed_refresh_token
        );

        if (!isTokenValid) {
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

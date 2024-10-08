import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../users/models/user.model';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(user: Users) {
        const url = `${process.env.API_URL}:${process.env.PORT}/api/users/activate/${user.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Stadium app ga xush kelibsiz.",
            template: "./confirm.hbs",
            context: {
                fullName: user.fullName,
                url,
            },
        });
    }

    async sendMailAdmin(admin: Admin) {
        const url = `${process.env.API_URL}:${process.env.PORT}/api/admin/activate/${admin.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: admin.email,
            subject: "Stadium app ga xush kelibsiz.",
            template: "./confirmAdmin.hbs",
            context: {
                login: admin.login,
                url,
            },
        });
    }
}

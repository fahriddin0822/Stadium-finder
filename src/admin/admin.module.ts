import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminGuard } from '../guards/admin.guard';
import { BotService } from '../bot/bot.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Admin]),
        JwtModule.register({}),
        MailModule,
    ],
    controllers: [AdminController],
    providers: [AdminService, JwtService, AdminGuard],
    exports:[]
})
export class AdminModule {}

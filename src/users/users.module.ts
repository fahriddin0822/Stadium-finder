import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OTP } from '../otp/models/otp.model';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Users, OTP]),
    JwtModule.register({}),
    MailModule,
    OtpModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

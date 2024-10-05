import { Module } from '@nestjs/common';
import { OTP } from './models/otp.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([OTP])],
})
export class OtpModule {}

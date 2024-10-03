import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { fromFileId } from 'telegraf/typings/input';
import { Bot } from './models/bot.model';
import { JwtModule } from '@nestjs/jwt';
import { Address } from './models/adress.model';
import { AddressModule } from './address.module';

@Module({
  imports:[SequelizeModule.forFeature([Bot, Address]), AddressModule],
  controllers: [],
  providers: [BotService, BotUpdate, JwtModule],
  exports:[BotService]
})
export class BotModule {}

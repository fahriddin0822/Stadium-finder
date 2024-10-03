import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { fromFileId } from 'telegraf/typings/input';

@Module({
  imports:[],
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}

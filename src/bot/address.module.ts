import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { fromFileId } from "telegraf/typings/input";
import { Bot } from "./models/bot.model";
import { JwtModule } from "@nestjs/jwt";
import { Address } from "./models/adress.model";

@Module({
    imports: [SequelizeModule.forFeature([Address])],
    providers: [],
    exports: [SequelizeModule],
})
export class AddressModule {}

import { Injectable } from "@nestjs/common";
import { CreateBotDto } from "./dto/create-bot.dto";
import { UpdateBotDto } from "./dto/update-bot.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./models/adress.model";

@Injectable()
export class BotService {
    constructor(
        @InjectModel(Bot) private botModel: typeof Bot,
        @InjectModel(Address) private addressModel: typeof Address,
        @InjectBot(BOT_NAME) private bot: Telegraf<Context>
    ) {}

    async start(ctx: Context) {
        const userId = ctx.from.id;
        const user = await this.botModel.findOne({
            where: { userId: userId },
        });
        if (!user) {
            await this.botModel.create({
                userId: userId,
                username: ctx.from.username,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
                lang: ctx.from.language_code,
            });

            await ctx.reply(
                `Iltimos,<b>"📱Telefon raqamni yuboring"</b> tugmasini bosing`,
                {
                    parse_mode: "HTML",
                    ...Markup.keyboard([
                        [
                            Markup.button.contactRequest(
                                "📱Telefon raqamni yuboring"
                            ),
                        ],
                    ])
                        .resize()
                        .oneTime(),
                }
            );
        } else if (!user.status) {
            await ctx.reply(
                `Iltimos,<b>"📱Telefon raqamni yuboring"</b> tugmasini bosing`,
                {
                    parse_mode: "HTML",
                    ...Markup.keyboard([
                        [
                            Markup.button.contactRequest(
                                "📱Telefon raqamni yuboring"
                            ),
                        ],
                    ])
                        .resize()
                        .oneTime(),
                }
            );
        } else {
            await ctx.reply(
                `Bu bot stadion egalarini faollashtirish uchun ishlatiladi`,
                {
                    parse_mode: "HTML",
                    ...Markup.removeKeyboard(),
                }
            );
        }
    }

    async onContact(ctx: Context) {
        if ("contact" in ctx.message) {
            const userId = ctx.from.id;
            const user = await this.botModel.findOne({
                where: { userId: userId },
            });
            if (!user) {
                await ctx.reply(`Itimos, Start tugmasini bosing`, {
                    parse_mode: "HTML",
                    ...Markup.keyboard([["/start"]])
                        .resize()
                        .oneTime(),
                });
            } else if (ctx.message.contact.user_id != userId) {
                await ctx.reply(
                    `Iltimos,o'zingizni telefon raqamingizni yuboring`,
                    {
                        parse_mode: "HTML",
                        ...Markup.keyboard([
                            [
                                Markup.button.contactRequest(
                                    "📱Telefon raqamni yuboring"
                                ),
                            ],
                        ])
                            .resize()
                            .oneTime(),
                    }
                );
            } else {
                await this.botModel.update(
                    {
                        status: true,
                        phoneNumber: ctx.message.contact.phone_number,
                    },
                    { where: { userId: userId } }
                );
                await ctx.reply(
                    `Raqam ${ctx.message.contact.phone_number} o'zgartirildi`,
                    { parse_mode: "HTML" }
                );
                await ctx.reply(`Siz faollashtirildingiz`, {
                    parse_mode: "HTML",
                    ...Markup.removeKeyboard(),
                });
            }
        }
    }

    async onStop(ctx: Context) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz`, {
                parse_mode: "HTML",
                ...Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        } else if (user.status) {
            await this.botModel.update(
                { status: false, phoneNumber: null },
                { where: { userId: userId } }
            );
            await ctx.reply(`Siz Botdan chiqdingiz`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
            });
        }
    }

    async onAddress(ctx: Context) {
        await ctx.reply(`Manzillarim:`, {
            parse_mode: "HTML",
            ...Markup.keyboard([
                ["Mening manzillarim", "Yangi manzil qo'shish"],
            ]).resize(),
        });
    }

    async addNewAddress(ctx: Context) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz`, {
                parse_mode: "HTML",
                ...Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        } else {
            await this.addressModel.create({
                user_id: userId,
                last_state: "address_name",
            });

            await ctx.reply(`Manzil nomini kiriting`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
            });
        }
    }

    async onText(ctx: Context) {
        if ("text" in ctx.message) {
            const userId = ctx.from.id;
            const user = await this.botModel.findByPk(userId);
            if (!user) {
                await ctx.reply(`Siz avval ro'yxatdan o'tmagansiz`, {
                    parse_mode: "HTML",
                    ...Markup.keyboard([["/start"]])
                        .resize()
                        .oneTime(),
                });
            } else {
                const address = await this.addressModel.findOne({
                    where: { user_id: userId },
                    order: [["id", "DESC"]],
                });
                if (address) {
                    if (address.last_state == "address_name") {
                        address.address_name = ctx.message.text;
                        address.last_state = "address";
                        await address.save();
                        await ctx.reply(`Manzilni kiriting`, {
                            parse_mode: "HTML",
                            ...Markup.removeKeyboard(),
                        });
                    } else if (address.last_state == "address") {
                        address.address = ctx.message.text;
                        address.last_state = "location";
                        await address.save();
                        await ctx.reply(`Manzil lokatsiyasini yuboring`, {
                            parse_mode: "HTML",
                            ...Markup.keyboard([
                                [
                                    Markup.button.locationRequest(
                                        "Lokatsiyani yuborish"
                                    ),
                                ],
                            ]),
                        });
                    }
                }
            }
        }
    }
    // try {
        
    // } catch (error) {
        
    // }

    // async sendOtp(phone_number: string, OTP: string):Promise<boolean> {
    //     const user = this.botModel.findOne({ where: { phone_number } });
    //     if (!user || !user.status) {
    //         return false
    //     }
    

    //     await this.bot.telegram.sendMessage(user.userId, )
    // }



    


}

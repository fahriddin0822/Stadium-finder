import { log } from "console";
import {
    Action,
    Command,
    Ctx,
    Hears,
    On,
    Start,
    Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService) { }
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await this.botService.start(ctx);
        // await ctx.reply("Bot ishga tushdi.");
    }

    // @On("photo")
    // async onPhoto(@Ctx() ctx: Context) {
    //     if ("photo" in ctx.message) {
    //         console.log(ctx.message.photo);
    //         await ctx.replyWithPhoto(
    //             String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
    //         );
    //     }
    // }

    // @On("video")
    // async onVideo(@Ctx() ctx: Context) {
    //     if ("video" in ctx.message) {
    //         console.log(ctx.message.video);
    //         await ctx.replyWithVideo(String(ctx.message.video.file_name));
    //     }
    // }

    // @On("sticker")
    // async onSticker(@Ctx() ctx: Context) {
    //     if ("sticker" in ctx.message) {
    //         console.log(ctx.message.sticker);
    //         await ctx.reply("👌👌👌");
    //     }
    // }

    // @On("animation")
    // async onAnimation(@Ctx() ctx: Context) {
    //     if ("animation" in ctx.message) {
    //         console.log(ctx.message.animation);
    //         await ctx.reply(String(ctx.message.animation.duration));
    //     }
    // }

    @On("contact")
    async onContact(@Ctx() ctx: Context) {
        await this.botService.onContact(ctx);
    }

    @Command("stop")
    async onStop(@Ctx() ctx: Context){
        await this.botService.onStop(ctx);
    }

    @Command("address")
    async onAdress(@Ctx() ctx: Context){
        await this.botService.onAddress(ctx);
    }

    @Hears("Yangi manzil qo'shish")
    async addNewAddress(@Ctx() ctx: Context){
        await this.botService.addNewAddress(ctx);
    }

    @Hears("Mening manzillarim")
    async showAddresses(@Ctx() ctx: Context){
        await this.botService.showAddresses(ctx);
    }

    @On("location")
    async onLocation(@Ctx() ctx: Context) {
        await this.botService.onLocation(ctx);
    }

    @Action(/location_+[1-9]/)
    async onClickAnyLocation(@Ctx() ctx: Context) {
        await this.botService.onClickAnyLocation(ctx);
    }

    @On("text")
    async onText(@Ctx() ctx: Context){
        await this.botService.onText(ctx);
    }



    // @On("voice")
    // async onVoice(@Ctx() ctx: Context) {
    //     if ("voice" in ctx.message) {
    //         console.log(ctx.message.voice);
    //         await ctx.reply(String(ctx.message.voice.duration));
    //     }
    // }


    // @On("invoice")
    // async onInVoice(@Ctx() ctx: Context) {
    //     if ("invoice" in ctx.message) {
    //         console.log(ctx.message.invoice);
    //         await ctx.reply(String(ctx.message.invoice));
    //     }
    // }


    // @On("document")
    // async onDocument(@Ctx() ctx: Context) {
    //     if ("document" in ctx.message) {
    //         console.log(ctx.message.document);
    //         await ctx.reply(String(ctx.message.document.file_name));
    //     }
    // }

    // @Hears("hi")
    // async hearsHi(@Ctx() ctx: Context) {
    //     await ctx.reply("Hi there!")
    // }

    // @Command("help")
    // async hearsHelp(@Ctx() ctx: Context) {
    //     await ctx.replyWithHTML(
    //         `
    //     <b>start</b> - botni ishga tushirish\n<b>stop</b> - botni to'xtatish\n<b>start</b> - ushbu buyruqlarni ko'rsatish\n
    //         `
    //     )
    // }


    // @Command("inline")
    // async inline(@Ctx() ctx: Context) {
    //     const inlineKeyboard = [
    //         [
    //             {
    //                 text: "Button 1",
    //                 callback_data: "button_1",
    //             },
    //             {
    //                 text: "Button 2",
    //                 callback_data: "button_2",   
    //             },
    //             {
    //                 text: "Button 3",
    //                 callback_data: "button_3",
    //             },
    //         ],
    //         [
    //             {
    //                 text: "Button 4",
    //                 callback_data: "button_4",
    //             },
    //             {
    //                 text: "Button 5",
    //                 callback_data: "button_5",
    //             },
    //         ],
    //         [
    //             {
    //                 text: "Button 6",
    //                 callback_data: "button_6",
    //             },
    //         ],
    //     ];
    //     await ctx.reply("Kerakli inline buttonni tanla: ", {
    //         reply_markup: {
    //             inline_keyboard: inlineKeyboard,
    //         },
    //     });
    // }

    // @Action(/button_+[1-9]/)
    // async onClickAnyButton(@Ctx() ctx: Context) {
    //     const actText:String = ctx.callbackQuery['data'];
    //     const button_id = Number(actText.split("_")[1]);
    //     await ctx.reply(`${button_id} - tugma bosildi.`);
    // }

    // @Command("main")
    // async mainButtons(@Ctx() ctx: Context) {
    //     await ctx.reply("Kerakli Main Buttonni tanla:", {
    //         parse_mode: "HTML",
    //         ...Markup.keyboard([
    //             ["bir", "ikki", "uch"],
    //             ["to'rt", "besh"],
    //             ["boshqa"],
    //             [Markup.button.contactRequest("📱Telefon raqamni yuboring")],
    //             [Markup.button.locationRequest("📍 Lokatsiyani yuboring")],
    //             [Markup.button.game("🎮 oyinni yuboring")],
    //         ])
    //             .resize()
    //             .oneTime(),
    //     });
    // }

    // @On("text")
    // async onText(@Ctx() ctx: Context) {
    //     console.log(ctx);
    //     if ("text" in ctx.message) {
    //         if (ctx.message.text == "salom") {
    //             await ctx.replyWithHTML("<b>Hello </b>👋👋👋");
    //         } else {
    //             await ctx.replyWithHTML(`<i>${ctx.message.text}</i>`);
    //         }
    //     }
    //     await this.botService.onText(ctx);
    // }

    // @On("message")
    // async onMessage(@Ctx() ctx: Context) {
    //     console.log(ctx.botInfo);
    //     console.log(ctx.chat);
    //     console.log(ctx.from);
    //     console.log(ctx.from.first_name);
    // }
}

import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { CITEXT } from "sequelize";
import { Context } from "telegraf";

@Update()
export class BotUpdate {
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply("Bot ishga tushdi.");
    }

    // @On("photo")
    // async onPhoto(@Ctx() ctx: Context) {
    //     if ("poto" in ctx.message) {
    //         console.log(ctx.message.poto);

    //         await ctx.
    //     }
    // }

    // @on("Video")
    //     async onPhoto(@Ctx() ctx: Context) {
    //     if ("poto" in ctx.message) {
    //         console.log(ctx.message.poto);

    //         await ctx.reply(String)
    //     }
    // }


    @On("text")
    async onText(@Ctx() ctx: Context) {
        console.log(ctx);

        if ("text" in ctx.message) {
            if (ctx.message.text == "salom") {
                await ctx.replyWithHTML("<b>Hello!</b>");
            } else {
                await ctx.replyWithHTML("<b>SALOM</b>");
            }
        }
    }

    @On("message")
    async onMessage(@Ctx() ctx: Context) {
        console.log(ctx.botInfo);
        console.log(ctx.chat);
        console.log(ctx.chat.id);
        console.log(ctx.from);
        console.log(ctx.from.first_name);
    }
}

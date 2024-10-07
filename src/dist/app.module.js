"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var admin_module_1 = require("./admin/admin.module");
var district_module_1 = require("./district/district.module");
var region_module_1 = require("./region/region.module");
var media_module_1 = require("./media/media.module");
var comfort_module_1 = require("./comfort/comfort.module");
var categories_module_1 = require("./categories/categories.module");
var orders_module_1 = require("./orders/orders.module");
var stadium_times_module_1 = require("./stadium_times/stadium_times.module");
var cart_module_1 = require("./cart/cart.module");
var user_wallet_module_1 = require("./user_wallet/user_wallet.module");
var user_cards_module_1 = require("./user_cards/user_cards.module");
var users_module_1 = require("./users/users.module");
var stadiums_module_1 = require("./stadiums/stadiums.module");
var comments_module_1 = require("./comments/comments.module");
var comfort_stadium_module_1 = require("./comfort_stadium/comfort_stadium.module");
var config_1 = require("@nestjs/config");
var sequelize_1 = require("@nestjs/sequelize");
var comfort_model_1 = require("./comfort/models/comfort.model");
var region_model_1 = require("./region/models/region.model");
var district_model_1 = require("./district/models/district.model");
var category_model_1 = require("./categories/models/category.model");
var user_model_1 = require("./users/models/user.model");
var mail_module_1 = require("./mail/mail.module");
var bot_module_1 = require("./bot/bot.module");
var nestjs_telegraf_1 = require("nestjs-telegraf");
var app_constants_1 = require("./app.constants");
var admin_model_1 = require("./admin/models/admin.model");
var bot_model_1 = require("./bot/models/bot.model");
var otp_module_1 = require("./otp/otp.module");
var otp_model_1 = require("./otp/models/otp.model");
var user_wallet_model_1 = require("./user_wallet/models/user_wallet.model");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                nestjs_telegraf_1.TelegrafModule.forRootAsync({
                    botName: app_constants_1.BOT_NAME,
                    useFactory: function () { return ({
                        token: process.env.BOT_TOKEN,
                        include: [bot_module_1.BotModule],
                        middlewares: []
                    }); }
                }),
                // TelegrafModule.forRootAsync({
                //     botName: "Orders bot",
                //     useFactory: () => ({
                //         token: process.env.BOT_TOKEN2,
                //         // include: [BotModule],
                //         // middlewares: [],
                //     }),
                // }),
                config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
                sequelize_1.SequelizeModule.forRoot({
                    dialect: "postgres",
                    host: process.env.POSTGRES_HOST,
                    port: Number(process.env.POSTGRES_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.POSTGRES_DB,
                    models: [comfort_model_1.Comfort, region_model_1.Region, district_model_1.District, category_model_1.Categories, user_model_1.Users, admin_model_1.Admin, bot_model_1.Bot, otp_model_1.OTP, user_wallet_model_1.UserWallet],
                    autoLoadModels: true,
                    sync: { alter: true },
                    logging: true,
                    synchronize: true
                }),
                admin_module_1.AdminModule,
                district_module_1.DistrictModule,
                region_module_1.RegionModule,
                media_module_1.MediaModule,
                comfort_module_1.ComfortModule,
                categories_module_1.CategoriesModule,
                orders_module_1.OrdersModule,
                stadium_times_module_1.StadiumTimesModule,
                cart_module_1.CartModule,
                user_wallet_module_1.UserWalletModule,
                user_cards_module_1.UserCardsModule,
                users_module_1.UsersModule,
                stadiums_module_1.StadiumsModule,
                comments_module_1.CommentsModule,
                comfort_stadium_module_1.ComfortStadiumModule,
                mail_module_1.MailModule,
                bot_module_1.BotModule,
                otp_module_1.OtpModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

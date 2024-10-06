"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BotUpdate = void 0;
var nestjs_telegraf_1 = require("nestjs-telegraf");
var telegraf_1 = require("telegraf");
var BotUpdate = /** @class */ (function () {
    function BotUpdate(botService) {
        this.botService = botService;
    }
    BotUpdate.prototype.onStart = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.reply("Bot ishga tushdi.")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.botService.start(ctx)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onPhoto = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("photo" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.photo);
                        return [4 /*yield*/, ctx.replyWithPhoto(String(ctx.message.photo[ctx.message.photo.length - 1].file_id))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onVideo = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("video" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.video);
                        return [4 /*yield*/, ctx.replyWithVideo(String(ctx.message.video.file_name))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onSticker = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("sticker" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.sticker);
                        return [4 /*yield*/, ctx.reply("👌👌👌")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onAnimation = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("animation" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.animation);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.animation.duration))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onContact = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("contact" in ctx.message)) return [3 /*break*/, 5];
                        console.log(ctx.message.contact);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.contact.first_name))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ctx.reply(String(ctx.message.contact.last_name))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, ctx.reply(String(ctx.message.contact.phone_number))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, ctx.reply(String(ctx.message.contact.user_id))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onLocation = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("location" in ctx.message)) return [3 /*break*/, 4];
                        console.log(ctx.message.location);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.location.latitude))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ctx.reply(String(ctx.message.location.longitude))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, ctx.replyWithLocation(ctx.message.location.longitude, ctx.message.location.latitude)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onVoice = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("voice" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.voice);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.voice.duration))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onInVoice = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("invoice" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.invoice);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.invoice))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onDocument = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!("document" in ctx.message)) return [3 /*break*/, 2];
                        console.log(ctx.message.document);
                        return [4 /*yield*/, ctx.reply(String(ctx.message.document.file_name))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.hearsHi = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.reply("Hi there!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.hearsHelp = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.replyWithHTML("\n        <b>start</b> - botni ishga tushirish\n<b>stop</b> - botni to'xtatish\n<b>start</b> - ushbu buyruqlarni ko'rsatish\n\n            ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.inline = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var inlineKeyboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inlineKeyboard = [
                            [
                                {
                                    text: "Button 1",
                                    callback_data: "button1"
                                },
                                {
                                    text: "Button 2",
                                    callback_data: "button2"
                                },
                                {
                                    text: "Button 3",
                                    callback_data: "button3"
                                },
                            ],
                            [
                                {
                                    text: "Button 4",
                                    callback_data: "button4"
                                },
                                {
                                    text: "Button 5",
                                    callback_data: "button5"
                                },
                            ],
                            [
                                {
                                    text: "Button 6",
                                    callback_data: "button6"
                                },
                            ],
                        ];
                        return [4 /*yield*/, ctx.reply("Kerakli inline buttonni tanla: ", {
                                reply_markup: {
                                    inline_keyboard: inlineKeyboard
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onClickAnyButton = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var buttonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttonData = ctx.callbackQuery.chat_instance;
                        return [4 /*yield*/, ctx.reply("Ixtiyoriy " + buttonData + " Button  tugmasi bosildi!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.mainButtons = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.reply("Kerakli Main Buttonni tanla:", __assign({ parse_mode: "HTML" }, telegraf_1.Markup.keyboard([
                            ["bir", "ikki", "uch"],
                            ["to'rt", "besh"],
                            ["boshqa"],
                            [telegraf_1.Markup.button.contactRequest("📱Telefon raqamni yuboring")],
                            [telegraf_1.Markup.button.locationRequest("📍 Lokatsiyani yuboring")],
                            [telegraf_1.Markup.button.game("🎮 oyinni yuboring")],
                        ])
                            .resize()
                            .oneTime()))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onText = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(ctx);
                        if (!("text" in ctx.message)) return [3 /*break*/, 4];
                        if (!(ctx.message.text == "salom")) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.replyWithHTML("<b>Hello </b>👋👋👋")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ctx.replyWithHTML("<i>" + ctx.message.text + "</i>")];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.botService.onText(ctx)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotUpdate.prototype.onMessage = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(ctx.botInfo);
                console.log(ctx.chat);
                console.log(ctx.from);
                console.log(ctx.from.first_name);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        nestjs_telegraf_1.Start(),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onStart");
    __decorate([
        nestjs_telegraf_1.On("photo"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onPhoto");
    __decorate([
        nestjs_telegraf_1.On("video"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onVideo");
    __decorate([
        nestjs_telegraf_1.On("sticker"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onSticker");
    __decorate([
        nestjs_telegraf_1.On("animation"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onAnimation");
    __decorate([
        nestjs_telegraf_1.On("contact"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onContact");
    __decorate([
        nestjs_telegraf_1.On("location"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onLocation");
    __decorate([
        nestjs_telegraf_1.On("voice"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onVoice");
    __decorate([
        nestjs_telegraf_1.On("invoice"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onInVoice");
    __decorate([
        nestjs_telegraf_1.On("document"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onDocument");
    __decorate([
        nestjs_telegraf_1.Hears("hi"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "hearsHi");
    __decorate([
        nestjs_telegraf_1.Command("help"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "hearsHelp");
    __decorate([
        nestjs_telegraf_1.Command("inline"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "inline");
    __decorate([
        nestjs_telegraf_1.Action(/button+[1-9]/),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onClickAnyButton");
    __decorate([
        nestjs_telegraf_1.Command("main"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "mainButtons");
    __decorate([
        nestjs_telegraf_1.On("text"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onText");
    __decorate([
        nestjs_telegraf_1.On("message"),
        __param(0, nestjs_telegraf_1.Ctx())
    ], BotUpdate.prototype, "onMessage");
    BotUpdate = __decorate([
        nestjs_telegraf_1.Update()
    ], BotUpdate);
    return BotUpdate;
}());
exports.BotUpdate = BotUpdate;

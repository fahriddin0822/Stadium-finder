"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.BotService = void 0;

var common_1 = require("@nestjs/common");

var sequelize_1 = require("@nestjs/sequelize");

var bot_model_1 = require("./models/bot.model");

var nestjs_telegraf_1 = require("nestjs-telegraf");

var app_constants_1 = require("../app.constants");

var telegraf_1 = require("telegraf");

var adress_model_1 = require("./models/adress.model");

var BotService =
/** @class */
function () {
  function BotService(botModel, addressModel, bot) {
    this.botModel = botModel;
    this.addressModel = addressModel;
    this.bot = bot;
  }

  BotService.prototype.start = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            userId = ctx.from.id;
            return [4
            /*yield*/
            , this.botModel.findByPk(userId)];

          case 1:
            user = _a.sent();
            if (!!user) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , this.botModel.create({
              userId: userId,
              username: ctx.from.username,
              firstName: ctx.from.first_name,
              lastName: ctx.from.last_name,
              lang: ctx.from.language_code
            })];

          case 2:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Iltimos,<b>\"\uD83D\uDCF1Telefon raqamni yuboring\"</b> tugmasini bosing", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([[telegraf_1.Markup.button.contactRequest("📱Telefon raqamni yuboring")]]).resize().oneTime()))];

          case 3:
            _a.sent();

            return [3
            /*break*/
            , 8];

          case 4:
            if (!!user.status) return [3
            /*break*/
            , 6];
            return [4
            /*yield*/
            , ctx.reply("Iltimos,<b>\"\uD83D\uDCF1Telefon raqamni yuboring\"</b> tugmasini bosing", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([[telegraf_1.Markup.button.contactRequest("📱Telefon raqamni yuboring")]]).resize().oneTime()))];

          case 5:
            _a.sent();

            return [3
            /*break*/
            , 8];

          case 6:
            return [4
            /*yield*/
            , ctx.reply("Bu bot stadion egalarini faollashtirish uchun ishlatiladi", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.removeKeyboard()))];

          case 7:
            _a.sent();

            _a.label = 8;

          case 8:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService.prototype.onContact = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!("contact" in ctx.message)) return [3
            /*break*/
            , 9];
            userId = ctx.from.id;
            return [4
            /*yield*/
            , this.botModel.findByPk(userId)];

          case 1:
            user = _a.sent();
            if (!!user) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , ctx.reply("Itimos, Start tugmasini bosing", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([["/start"]]).resize().oneTime()))];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 9];

          case 3:
            if (!(ctx.message.contact.userId != userId)) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , ctx.reply("Iltimos,o'zingizni telefon raqamingizni yuboring", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([[telegraf_1.Markup.button.contactRequest("📱Telefon raqamni yuboring")]]).resize().oneTime()))];

          case 4:
            _a.sent();

            return [3
            /*break*/
            , 9];

          case 5:
            return [4
            /*yield*/
            , this.botModel.update({
              status: true,
              phoneNumber: ctx.message.contact.phone_number
            }, {
              where: {
                userId: userId
              }
            })];

          case 6:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Raqam " + ctx.message.contact.phone_number + " o'zgartirildi", {
              parse_mode: "HTML"
            })];

          case 7:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Siz faollashtirildingiz", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.removeKeyboard()))];

          case 8:
            _a.sent();

            _a.label = 9;

          case 9:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService.prototype.onStop = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            userId = ctx.from.id;
            return [4
            /*yield*/
            , this.botModel.findByPk(userId)];

          case 1:
            user = _a.sent();
            if (!!user) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , ctx.reply("Siz avval ro'yxatdan o'tmagansiz", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([["/start"]]).resize().oneTime()))];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 6];

          case 3:
            if (!user.status) return [3
            /*break*/
            , 6];
            return [4
            /*yield*/
            , this.botModel.update({
              status: false,
              phoneNumber: null
            }, {
              where: {
                userId: userId
              }
            })];

          case 4:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Siz Botdan chiqdingiz", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.removeKeyboard()))];

          case 5:
            _a.sent();

            _a.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService.prototype.onAddress = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , ctx.reply("Manzillarim:", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([["Mening manzillarim", "Yangi manzil qo'shish"]]).resize()))];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService.prototype.addNewAddress = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            userId = ctx.from.id;
            return [4
            /*yield*/
            , this.botModel.findByPk(userId)];

          case 1:
            user = _a.sent();
            if (!!user) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , ctx.reply("Siz avval ro'yxatdan o'tmagansiz", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([["/start"]]).resize().oneTime()))];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 6];

          case 3:
            return [4
            /*yield*/
            , this.addressModel.create({
              userId: userId,
              last_state: "address_name"
            })];

          case 4:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Manzil nomini kiriting", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.removeKeyboard()))];

          case 5:
            _a.sent();

            _a.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService.prototype.onText = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, user, address;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!("text" in ctx.message)) return [3
            /*break*/
            , 10];
            userId = ctx.from.id;
            return [4
            /*yield*/
            , this.botModel.findByPk(userId)];

          case 1:
            user = _a.sent();
            if (!!user) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , ctx.reply("Siz avval ro'yxatdan o'tmagansiz", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([["/start"]]).resize().oneTime()))];

          case 2:
            _a.sent();

            return [3
            /*break*/
            , 10];

          case 3:
            return [4
            /*yield*/
            , this.addressModel.findOne({
              where: {
                userId: userId
              },
              order: [["id", "DESC"]]
            })];

          case 4:
            address = _a.sent();
            if (!address) return [3
            /*break*/
            , 10];
            if (!(address.last_state == "address_name")) return [3
            /*break*/
            , 7];
            address.address_name = ctx.message.text;
            address.last_state = "address";
            return [4
            /*yield*/
            , address.save()];

          case 5:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Manzilni kiriting", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.removeKeyboard()))];

          case 6:
            _a.sent();

            return [3
            /*break*/
            , 10];

          case 7:
            if (!(address.last_state == "address")) return [3
            /*break*/
            , 10];
            address.address = ctx.message.text;
            address.last_state = "location";
            return [4
            /*yield*/
            , address.save()];

          case 8:
            _a.sent();

            return [4
            /*yield*/
            , ctx.reply("Manzil lokatsiyasini yuboring", __assign({
              parse_mode: "HTML"
            }, telegraf_1.Markup.keyboard([[telegraf_1.Markup.button.locationRequest("Lokatsiyani yuborish")]])))];

          case 9:
            _a.sent();

            _a.label = 10;

          case 10:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  BotService = __decorate([common_1.Injectable(), __param(0, sequelize_1.InjectModel(bot_model_1.Bot)), __param(1, sequelize_1.InjectModel(adress_model_1.Address)), __param(2, nestjs_telegraf_1.InjectBot(app_constants_1.BOT_NAME))], BotService);
  return BotService;
}();

exports.BotService = BotService;
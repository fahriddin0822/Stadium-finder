"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserWalletModule = void 0;
var common_1 = require("@nestjs/common");
var user_wallet_service_1 = require("./user_wallet.service");
var user_wallet_controller_1 = require("./user_wallet.controller");
var sequelize_1 = require("@nestjs/sequelize");
var user_wallet_model_1 = require("./models/user_wallet.model");
var UserWalletModule = /** @class */ (function () {
    function UserWalletModule() {
    }
    UserWalletModule = __decorate([
        common_1.Module({
            imports: [sequelize_1.SequelizeModule.forFeature([user_wallet_model_1.UserWallet])],
            controllers: [user_wallet_controller_1.UserWalletController],
            providers: [user_wallet_service_1.UserWalletService]
        })
    ], UserWalletModule);
    return UserWalletModule;
}());
exports.UserWalletModule = UserWalletModule;

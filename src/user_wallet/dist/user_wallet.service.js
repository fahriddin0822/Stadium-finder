"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserWalletService = void 0;
var common_1 = require("@nestjs/common");
var sequelize_1 = require("@nestjs/sequelize");
var user_wallet_model_1 = require("./models/user_wallet.model");
var UserWalletService = /** @class */ (function () {
    function UserWalletService(user_wallet_model) {
        this.user_wallet_model = user_wallet_model;
    }
    UserWalletService.prototype.create = function (createUserWalletDto) {
        return this.user_wallet_model.create(createUserWalletDto);
    };
    UserWalletService.prototype.findAll = function () {
        return this.user_wallet_model.findAll({ include: { all: true } });
    };
    UserWalletService.prototype.findOne = function (id) {
        return this.user_wallet_model.findByPk(id);
    };
    UserWalletService.prototype.update = function (id, updateUserWalletDto) {
        return this.user_wallet_model.update(updateUserWalletDto, { where: { id: id } });
    };
    UserWalletService.prototype.remove = function (id) {
        return this.user_wallet_model.destroy({ where: { id: id } });
    };
    UserWalletService = __decorate([
        common_1.Injectable(),
        __param(0, sequelize_1.InjectModel(user_wallet_model_1.UserWallet))
    ], UserWalletService);
    return UserWalletService;
}());
exports.UserWalletService = UserWalletService;

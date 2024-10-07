"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserWallet = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var user_model_1 = require("../../users/models/user.model");
var UserWallet = /** @class */ (function (_super) {
    __extends(UserWallet, _super);
    function UserWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true, primaryKey: true })
    ], UserWallet.prototype, "id");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return user_model_1.Users; }),
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })
    ], UserWallet.prototype, "user_id");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return user_model_1.Users; })
    ], UserWallet.prototype, "user");
    __decorate([
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 })
    ], UserWallet.prototype, "wallet");
    return UserWallet;
}(sequelize_typescript_1.Model));
exports.UserWallet = UserWallet;

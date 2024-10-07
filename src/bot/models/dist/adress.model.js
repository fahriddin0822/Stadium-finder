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
exports.Address = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var bot_model_1 = require("./bot.model");
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        })
    ], Address.prototype, "id");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return bot_model_1.Bot; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.BIGINT
        })
    ], Address.prototype, "userId");
    __decorate([
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING })
    ], Address.prototype, "address_name");
    __decorate([
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING })
    ], Address.prototype, "address");
    __decorate([
        sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING })
    ], Address.prototype, "location");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING
        })
    ], Address.prototype, "last_state");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return bot_model_1.Bot; })
    ], Address.prototype, "bot");
    Address = __decorate([
        sequelize_typescript_1.Table({ tableName: "address" })
    ], Address);
    return Address;
}(sequelize_typescript_1.Model));
exports.Address = Address;

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
exports.Stadiums = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var category_model_1 = require("../../categories/models/category.model");
var region_model_1 = require("../../region/models/region.model");
var district_model_1 = require("../../district/models/district.model");
var owner_model_1 = require("../../owner/model/owner.model");
var Stadiums = /** @class */ (function (_super) {
    __extends(Stadiums, _super);
    function Stadiums() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER)
    ], Stadiums.prototype, "id");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return category_model_1.Categories; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Stadiums.prototype, "category_id");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return category_model_1.Categories; })
    ], Stadiums.prototype, "category");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return owner_model_1.Owner; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Stadiums.prototype, "owner_id");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return owner_model_1.Owner; })
    ], Stadiums.prototype, "owner");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Stadiums.prototype, "contact_with");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Stadiums.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING
        })
    ], Stadiums.prototype, "volume");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Stadiums.prototype, "address");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return region_model_1.Region; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Stadiums.prototype, "region_id");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return region_model_1.Region; })
    ], Stadiums.prototype, "region");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return district_model_1.District; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Stadiums.prototype, "district_id");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return district_model_1.District; })
    ], Stadiums.prototype, "district");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING
        })
    ], Stadiums.prototype, "location");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.DATE,
            allowNull: false
        })
    ], Stadiums.prototype, "buildAt");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.TIME,
            allowNull: false
        })
    ], Stadiums.prototype, "start_time");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.TIME,
            allowNull: false
        })
    ], Stadiums.prototype, "end_time");
    Stadiums = __decorate([
        sequelize_typescript_1.Table({ tableName: "stadiums" })
    ], Stadiums);
    return Stadiums;
}(sequelize_typescript_1.Model));
exports.Stadiums = Stadiums;

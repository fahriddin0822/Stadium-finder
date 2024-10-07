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
exports.OwnerService = void 0;
var common_1 = require("@nestjs/common");
var sequelize_1 = require("@nestjs/sequelize");
var owner_model_1 = require("./model/owner.model");
var OwnerService = /** @class */ (function () {
    function OwnerService(owner_model) {
        this.owner_model = owner_model;
    }
    OwnerService.prototype.create = function (createOwnerDto) {
        return this.owner_model.create(createOwnerDto);
    };
    OwnerService.prototype.findAll = function () {
        return this.owner_model.findAll({ include: { all: true } });
    };
    OwnerService.prototype.findOne = function (id) {
        return this.owner_model.findByPk(id);
    };
    OwnerService.prototype.update = function (id, updateOwnerDto) {
        return this.owner_model.update(updateOwnerDto, { where: { id: id } });
    };
    OwnerService.prototype.remove = function (id) {
        return this.owner_model.destroy({ where: { id: id } });
    };
    OwnerService = __decorate([
        common_1.Injectable(),
        __param(0, sequelize_1.InjectModel(owner_model_1.Owner))
    ], OwnerService);
    return OwnerService;
}());
exports.OwnerService = OwnerService;

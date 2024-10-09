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
exports.__esModule = true;
exports.SmsService = void 0;
var common_1 = require("@nestjs/common");
var SmsService = /** @class */ (function () {
    function SmsService() {
    }
    SmsService = __decorate([
        common_1.Injectable()
    ], SmsService);
    return SmsService;
}());
exports.SmsService = SmsService;
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('mobile_phone', '99899021345678');
data.append('message', 'Eskiz Test');
data.append('from', '4546');
var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'notify.eskiz.uz/api/message/sms/send',
    headers: __assign({}, data.getHeaders()),
    data: data
};
axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
})["catch"](function (error) {
    console.log(error);
});

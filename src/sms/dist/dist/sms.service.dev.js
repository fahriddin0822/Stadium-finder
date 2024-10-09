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

exports.__esModule = true;
exports.SmsService = void 0;

var common_1 = require("@nestjs/common");

var SmsService =
/** @class */
function () {
  function SmsService() {}

  SmsService = __decorate([common_1.Injectable()], SmsService);
  return SmsService;
}();

exports.SmsService = SmsService;

var axios = require('axios');

var FormData = require('form-data');

var data = new FormData();
data.append('mobile_phone', '99899012345678');
data.append('message', 'Eskiz Test');
data.append('from', '4546');
var config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'notify.eskiz.uz/api/message/sms/send',
  headers: __assign({}, data.getHeaders()),
  data: data
};
axios(config).then(function (response) {
  console.log(JSON.stringify(response.data));
})["catch"](function (error) {
  console.log(error);
});
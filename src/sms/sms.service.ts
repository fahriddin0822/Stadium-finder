import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService { }



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
    headers: {
        ...data.getHeaders()
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    }
    );

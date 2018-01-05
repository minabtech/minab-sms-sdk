var minab = require('minab-sms-sdk');

var api = minab.RestAPI({
    appId: '5a280022a0bf7a3ec56e287a',
    token: 'ac05a160-da92-11e7-bfe9-f5f33235c97d',
    host: 'http://localhost:8080'
});

var params = {
    'phone_no': 'PHONE_NO',
    'message': "message"
};

api.send_message(params, function(status, response) {
    console.log("done ----", status, response)
});
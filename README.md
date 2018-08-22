## Minab SMS SDK

## USAGE


```javascript
var minab = require('minab-sms-sdk');

var api = minab.RestAPI({
    appId: 'ID',
    token: 'token',
    host: 'http://localhost:3000/api'
});

var params = {
    'phone_no': 'PHONE_NO',
    'message': "message"
};

api.send_message(params, function(status, response) {
    console.log("done ----", status, response)
});

```

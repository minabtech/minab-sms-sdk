var Request = require('request');

var MinabSMS = function () {
    this.options = {};
    this.options.host = '';
    this.options.version = 'v1';
    this.options.appId = '';
    this.options.token = '';
};

MinabSMS.prototype.request = function (action, method, params, callback) {
    if (!callback) {
        var callback = function () { };
    }
    var err = null;
    var path = this.options.host + action;

    var request_options = {
        uri: path,
        headers: {},
        params: false,
        json: true
    };

    if (method == 'POST') {
        request_options.json = params;
        request_options.json.appId = this.options.appId;
        request_options.json.token = this.options.token;

        Request.post(request_options, function (error, response, body) {
            if (error || !response) {
                return callback(500, body)
            }

            callback(response.statusCode, body);
        });
    }
    // else if (method == 'GET') {
    //     request_options.qs = {};
    //     request_options.qs.token = this.options.token;

    //     Request.get(request_options, function (error, response, body) {
    //         if (error || !response) {
    //             return callback(500, body)
    //         }
    //         if (response.statusCode != 201) {
    //             err = new MinabSMSError(error);
    //         }            
    //         callback(response.statusCode, body);
    //     });
    // }
};

// Send Message
MinabSMS.prototype.send_message = function (params, callback) {
    var action = '/messages/send-message';
    var method = 'POST';

    if (!params.phone_no || !params.message) {
        throw 'phone_no & message are required.';
    }

    this.request(action, method, params, callback);
};

exports.RestAPI = function (config) {
    var smsObj = new MinabSMS();

    if (!config) {
        throw 'Auth ID and Auth Token must be provided.';
    }

    if (typeof config != 'object') {
        throw 'Config for RestAPI must be provided as an object.';
    }

    if (!config.host) {
        throw 'SMS Api Server Host must be provided.';
    }

    if (!config.appId || !config.token) {
        throw 'App ID and Auth Token must be provided.';
    }

    // override default config according to the config provided.
    for (key in config) {
        smsObj.options[key] = config[key];
    }

    return smsObj;
}


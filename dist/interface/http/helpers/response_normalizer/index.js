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
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./../../constants/response");
function responseNormalizer(res, code, data, overrideMessage) {
    var apiResponse = response_1.responseList.get(code);
    if (!apiResponse) {
        apiResponse = response_1.responseList.get('internal_server_error');
    }
    if (overrideMessage) {
        apiResponse.message = overrideMessage;
    }
    return res.status(apiResponse.status).json(__assign({}, apiResponse, { data: data }));
}
exports.default = responseNormalizer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_normalizer_1 = require("../../helpers/response_normalizer");
function momus(error, req, res, next) {
    var overrideMessage;
    if (error.isJoi) {
        overrideMessage = error.details.map(function (detail) { return detail.message; }).join('. ');
        error.message = 'invalid_parameters';
    }
    response_normalizer_1.default(res, error.message, undefined, overrideMessage);
}
exports.default = momus;

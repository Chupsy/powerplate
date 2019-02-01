"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_normalizer_1 = require("../../helpers/response_normalizer");
const response_1 = require("../../constants/response");
function momus(error, req, res, next) {
    let overrideMessage;
    if (error.type === 'entity.parse.failed') {
        error.message = response_1.ResponseCodes.INVALID_JSON_INPUT;
    }
    if (error.isJoi) {
        overrideMessage = error.details.map((detail) => detail.message).join('. ');
        error.message = response_1.ResponseCodes.INVALID_PARAMETERS;
    }
    response_normalizer_1.default(res, error.message, undefined, overrideMessage);
}
exports.default = momus;

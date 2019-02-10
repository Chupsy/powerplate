"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./../../constants/response");
function responseNormalizer(res, code, data, overrideMessage) {
    let apiResponse = response_1.responseList.get(code);
    if (!apiResponse) {
        apiResponse = response_1.responseList.get(response_1.ResponseCodes.INTERNAL_SERVER_ERROR);
    }
    return res.status(apiResponse.status).json({
        status: apiResponse.status,
        code: apiResponse.code,
        message: overrideMessage || apiResponse.message,
        data
    });
}
exports.default = responseNormalizer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.userDeleteSchema = {
    params: joi_1.object().keys({
        userId: joi_1.number().required()
    })
};

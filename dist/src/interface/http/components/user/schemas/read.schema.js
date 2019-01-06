"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.userFindOneSchema = {
    params: joi_1.object().keys({
        userId: joi_1.number().required()
    })
};
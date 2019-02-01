"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.userCreateSchema = {
    body: joi_1.object().keys({
        email: joi_1.string()
            .email()
            .required(),
        firstName: joi_1.string()
            .min(2)
            .required(),
        lastName: joi_1.string()
            .min(2)
            .required(),
        age: joi_1.number()
            .min(1)
            .precision(0)
            .required(),
        password: joi_1.string()
            .min(6)
            .required()
    })
};

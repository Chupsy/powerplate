"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.userUpdateSchema = {
    params: joi_1.object()
        .keys({
        userId: joi_1.number().required()
    })
        .required(),
    body: joi_1.object()
        .keys({
        email: joi_1.string()
            .email()
            .optional(),
        firstName: joi_1.string()
            .min(2)
            .optional(),
        lastName: joi_1.string()
            .min(2)
            .optional(),
        age: joi_1.number()
            .min(1)
            .precision(0)
            .optional(),
        password: joi_1.string()
            .min(6)
            .optional(),
        oldPassword: joi_1.string().optional()
    })
        .or('email', 'firstName', 'lastName', 'age', 'password')
        .with('password', 'oldPassword')
};

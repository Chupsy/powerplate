"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.userUpdateSchema = {
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
            .min(0)
            .precision(0)
            .optional()
    })
        .or('email', 'firstName', 'lastName', 'age')
};

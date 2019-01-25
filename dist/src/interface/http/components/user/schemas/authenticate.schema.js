"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
var strategies_1 = require("../../../../../app/constants/strategies");
exports.userAuthenticateSchema = {
    body: joi_1.object().keys({
        authData: joi_1.object()
            .keys({
            email: joi_1.string().email(),
            password: joi_1.string(),
            bearerToken: joi_1.string()
        })
            .xor('email', 'bearerToken')
            .with('email', 'password'),
        strategy: joi_1.string()
            .valid([strategies_1.AUTHENTICATION_STRATEGY.BEARER_TOKEN, strategies_1.AUTHENTICATION_STRATEGY.LOCAL])
            .required()
    })
};

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const identifiers_1 = require("../../infra/identifiers");
const strategies_1 = require("../constants/strategies");
const user_app_1 = require("../user/user.app");
const identifiers_2 = require("../identifiers");
const user_1 = require("../user/user");
const moment = require("moment");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const user_infra_1 = require("../../infra/mongodb/user/user.infra");
const oauth2_token_infra_1 = require("../../infra/mongodb/oauth2_token/oauth2_token.infra");
let AuthenticateApp = class AuthenticateApp {
    constructor(userInfra, userApp, oauth2TokenInfra) {
        this.userInfra = userInfra;
        this.userApp = userApp;
        this.oauth2TokenInfra = oauth2TokenInfra;
    }
    async authenticateByStrategy(authData, strategy) {
        if (strategy === strategies_1.AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password) {
            return await this.authenticateByPassword(authData.email, authData.password);
        }
        if (strategy === strategies_1.AUTHENTICATION_STRATEGY.BEARER_TOKEN && authData.bearerToken) {
            return await this.authenticateByBearer(authData.bearerToken);
        }
        throw new Error('not_implemented');
    }
    async cancelBearer(bearerToken) {
        const parsedToken = jwt.verify(bearerToken, 'config.secretJWT');
        const foundToken = await this.oauth2TokenInfra.findToken(this.verifyTokenContent(parsedToken));
        if (!foundToken) {
            throw new Error('invalid_token');
        }
        await this.oauth2TokenInfra.destroyToken(foundToken.accessToken);
    }
    async authenticateByBearer(bearerToken) {
        const parsedToken = jwt.verify(bearerToken, 'config.secretJWT');
        const foundToken = await this.oauth2TokenInfra.findToken(this.verifyTokenContent(parsedToken));
        if (!foundToken) {
            throw new Error('invalid_token');
        }
        if (moment(foundToken.accessTokenExpirationDate).isBefore(moment())) {
            throw new Error('token_expired');
        }
        const user = await this.userApp.findUserById(foundToken.userId);
        return new user_1.default(this.userInfra, user).export();
    }
    verifyTokenContent(token) {
        const validation = joi.validate(token, {
            accessToken: joi.string().required(),
            refreshToken: joi.string().required(),
            rememberMe: joi.boolean().required(),
            accessTokenExpirationDate: joi.date().required(),
            userId: joi.number().required(),
            iat: joi.number().required()
        });
        if (!validation.error) {
            return {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                rememberMe: token.rememberMe,
                accessTokenExpirationDate: new Date(token.accessTokenExpirationDate),
                userId: token.userId
            };
        }
        throw new Error('invalid_token');
    }
    async authenticateByPassword(email, password) {
        const user = await this.userApp.findUserByEmail(email);
        if (!user.verifyPassword(password)) {
            throw new Error('invalid_password');
        }
        let token = await this.generateBearer(user);
        return {
            user: user.export(),
            token
        };
    }
    async generateBearer(user) {
        let token = {
            accessToken: crypto.randomBytes(32).toString('hex'),
            refreshToken: crypto.randomBytes(32).toString('hex'),
            accessTokenExpirationDate: moment()
                .add(1, 'day')
                .toDate(),
            userId: user.userId,
            rememberMe: false
        };
        await this.oauth2TokenInfra.createToken(token);
        return jwt.sign(token, 'config.secretJWT');
    }
};
AuthenticateApp = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(identifiers_1.default.UserInfra)),
    __param(1, inversify_1.inject(identifiers_2.default.UserApp)),
    __param(2, inversify_1.inject(identifiers_1.default.Oauth2TokenInfra)),
    __metadata("design:paramtypes", [user_infra_1.UserInfra,
        user_app_1.default,
        oauth2_token_infra_1.Oauth2TokenInfra])
], AuthenticateApp);
exports.AuthenticateApp = AuthenticateApp;

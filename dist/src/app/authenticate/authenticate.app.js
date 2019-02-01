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
const oauth2_token_resource_1 = require("../../infra/resources/oauth2_token/oauth2_token.resource");
const strategies_1 = require("../constants/strategies");
const user_app_1 = require("../user/user.app");
const identifiers_2 = require("../identifiers");
const moment = require("moment");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let AuthenticateApp = class AuthenticateApp {
    constructor(userApp, oauth2TokenResource) {
        this.userApp = userApp;
        this.oauth2TokenResource = oauth2TokenResource;
    }
    async authenticateByStrategy(authData, strategy) {
        if (strategy === strategies_1.AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password) {
            return await this.authenticateByPassword(authData.email, authData.password);
        }
    }
    // public async refreshBearer(bearerToken: string) {}
    async cancelBearer(bearerToken) { }
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
    async authenticateByBearer(bearerToken) {
        let decoded = jwt.decode(bearerToken);
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
        await this.oauth2TokenResource.createToken(token);
        return jwt.sign(token, 'config.secretJWT');
    }
};
AuthenticateApp = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(identifiers_2.default.UserApp)),
    __param(1, inversify_1.inject(identifiers_1.default.Oauth2TokenResource)),
    __metadata("design:paramtypes", [user_app_1.default,
        oauth2_token_resource_1.Oauth2TokenResource])
], AuthenticateApp);
exports.AuthenticateApp = AuthenticateApp;

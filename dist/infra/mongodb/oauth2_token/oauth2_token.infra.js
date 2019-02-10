"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const inversify_1 = require("inversify");
exports.Oauth2TokenSchema = new mongoose.Schema({
    accessToken: { type: String, required: true, trim: true },
    refreshToken: { type: String, required: true, trim: true },
    rememberMe: { type: Boolean, required: true },
    accessTokenExpirationDate: { type: Date, required: true },
    userId: { type: Number, required: true, unique: true, min: 0 },
    deletedAt: { type: Date, required: true }
});
let Oauth2TokenInfra = class Oauth2TokenInfra {
    init(db) {
        this.Oauth2Token = db.model('Oauth2Token', exports.Oauth2TokenSchema);
    }
    async findToken(tokenData) {
        return this.convertDocumentToIToken(await this.Oauth2Token.findOne(Object.assign({}, tokenData, { deletedAt: null })));
    }
    async destroyToken(accessToken) {
        await this.Oauth2Token.findOneAndUpdate({ accessToken }, { deletedAt: new Date() });
    }
    async createToken(tokenData) {
        return this.convertDocumentToIToken(await this.Oauth2Token.create(Object.assign({}, tokenData, { deletedAt: null })));
    }
    convertDocumentToIToken(token) {
        if (!token) {
            return null;
        }
        let convertedToken = token.toObject();
        return {
            accessToken: convertedToken.accessToken,
            refreshToken: convertedToken.refreshToken,
            rememberMe: convertedToken.rememberMe,
            accessTokenExpirationDate: convertedToken.accessTokenExpirationDate,
            userId: convertedToken.userId
        };
    }
};
Oauth2TokenInfra = __decorate([
    inversify_1.injectable()
], Oauth2TokenInfra);
exports.Oauth2TokenInfra = Oauth2TokenInfra;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Oauth2TokenResourceMock = /** @class */ (function () {
    function Oauth2TokenResourceMock() {
    }
    Oauth2TokenResourceMock.prototype.findToken = function (tokenData) {
        throw new Error('no_implemented_yet');
    };
    Oauth2TokenResourceMock.prototype.destroyToken = function (accessToken) {
        throw new Error('no_implemented_yet');
    };
    Oauth2TokenResourceMock.prototype.createToken = function (tokenData) {
        return null;
    };
    Oauth2TokenResourceMock = __decorate([
        inversify_1.injectable()
    ], Oauth2TokenResourceMock);
    return Oauth2TokenResourceMock;
}());
exports.Oauth2TokenResourceMock = Oauth2TokenResourceMock;

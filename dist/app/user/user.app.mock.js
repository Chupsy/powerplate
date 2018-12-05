"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var UserAppMock = /** @class */ (function () {
    function UserAppMock() {
    }
    UserAppMock.prototype.findUserById = function (userId) {
        if (userId !== 1) {
            throw new Error('data_not_found');
        }
        return {
            userId: 1
        };
    };
    UserAppMock.prototype.findAllUsers = function () {
        return [
            {
                userId: 1
            },
            {
                userId: 2
            }
        ];
    };
    UserAppMock.prototype.deleteUserById = function () {
        return;
    };
    UserAppMock.prototype.createUser = function (userToCreate) {
        return __assign({ userId: 1 }, userToCreate);
    };
    UserAppMock.prototype.updateUser = function (userId, dataToUpdate) {
        return __assign({ userId: userId }, dataToUpdate);
    };
    UserAppMock = __decorate([
        inversify_1.injectable()
    ], UserAppMock);
    return UserAppMock;
}());
exports.default = UserAppMock;

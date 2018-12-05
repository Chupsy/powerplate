"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var UserApp = /** @class */ (function () {
    function UserApp() {
    }
    UserApp.prototype.findUserById = function (userId) {
        return {};
    };
    UserApp.prototype.findAllUsers = function () {
        return {};
    };
    UserApp.prototype.deleteUserById = function (userId) {
        return;
    };
    UserApp.prototype.createUser = function (userToCreate) {
        return userToCreate;
    };
    UserApp.prototype.updateUser = function (userId, dataToUpdate) {
        return dataToUpdate;
    };
    UserApp = __decorate([
        inversify_1.injectable()
    ], UserApp);
    return UserApp;
}());
exports.default = UserApp;

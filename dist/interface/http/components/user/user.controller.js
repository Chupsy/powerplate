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
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var identifiers_1 = require("../../../../app/identifiers");
var celebrate_1 = require("celebrate");
var express = require("express");
var read_schema_1 = require("./schemas/read.schema");
var response_normalizer_1 = require("../../helpers/response_normalizer");
var user_app_1 = require("../../../../app/user/user.app");
var UserController = /** @class */ (function () {
    function UserController(userApp) {
        this.userApp = userApp;
    }
    UserController.prototype.getUser = function (id, res) {
        var user = this.userApp.findUserById(id);
        response_normalizer_1.default(res, 'user_found', user);
    };
    __decorate([
        inversify_express_utils_1.httpGet('/:userId', celebrate_1.celebrate(read_schema_1.userFindOneSchema)),
        __param(0, inversify_express_utils_1.requestParam('userId')), __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "getUser", null);
    UserController = __decorate([
        inversify_express_utils_1.controller('/users'),
        __param(0, inversify_1.inject(identifiers_1.default.UserApp)),
        __metadata("design:paramtypes", [user_app_1.default])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

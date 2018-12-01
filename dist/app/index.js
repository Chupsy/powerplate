"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
require("reflect-metadata");
var user_app_1 = require("./user/user.app");
var identifiers_1 = require("./identifiers");
exports.appModule = new inversify_1.ContainerModule(function (bind) {
    bind(identifiers_1.default.UserApp)
        .to(user_app_1.default)
        .inSingletonScope();
});

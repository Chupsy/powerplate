"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var user_factory_1 = require("./user/user.factory");
var identifiers_1 = require("./identifiers");
exports.domainModule = new inversify_1.ContainerModule(function (bind) {
    bind(identifiers_1.default.UserFactory)
        .to(user_factory_1.default)
        .inSingletonScope();
});

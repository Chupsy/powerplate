"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const user_app_1 = require("./user/user.app");
const identifiers_1 = require("./identifiers");
exports.appModule = new inversify_1.ContainerModule((bind) => {
    bind(identifiers_1.default.UserApp)
        .to(user_app_1.default)
        .inSingletonScope();
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const identifiers_1 = require("./identifiers");
const user_app_mock_1 = require("./user/user.app.mock");
exports.appModuleMock = new inversify_1.ContainerModule((bind) => {
    bind(identifiers_1.default.UserApp)
        .to(user_app_mock_1.UserAppMock)
        .inSingletonScope();
});

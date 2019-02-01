"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const identifiers_1 = require("../identifiers");
const user_infra_1 = require("./user/user.infra");
const mongoose = require("mongoose");
const oauth2_token_infra_1 = require("./oauth2_token/oauth2_token.infra");
exports.mongodbInfraModule = new inversify_1.ContainerModule((bind) => {
    bind(identifiers_1.default.UserResource)
        .to(user_infra_1.UserInfra)
        .inSingletonScope();
    bind(identifiers_1.default.Oauth2TokenResource)
        .to(oauth2_token_infra_1.Oauth2TokenInfra)
        .inSingletonScope();
});
async function start(container, config) {
    await mongoose.connect(config.uri, { useNewUrlParser: true });
    let userInfra = container.get(identifiers_1.default.UserResource);
    let oauth2Token = container.get(identifiers_1.default.Oauth2TokenResource);
    userInfra.init(mongoose);
    oauth2Token.init(mongoose);
    console.log('database ready');
    return;
}
exports.start = start;

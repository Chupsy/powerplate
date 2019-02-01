"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const http_1 = require("./interface/http");
const app_1 = require("./app");
const mongodb_1 = require("./infra/mongodb");
const config_1 = require("./../config");
const loaderContainer = new inversify_1.Container();
loaderContainer.load(mongodb_1.mongodbInfraModule);
loaderContainer.load(app_1.appModule);
loaderContainer.load(http_1.httpInterfaceModule);
(async () => {
    await mongodb_1.start(loaderContainer, config_1.default.infra.mongodb);
    http_1.init(loaderContainer, config_1.default.interface.http);
    http_1.start();
})();

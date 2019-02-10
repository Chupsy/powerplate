"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const http_1 = require("./interface/http");
const app_1 = require("./app");
const mongodb_1 = require("./infra/mongodb");
const dotenv = require("dotenv");
dotenv.config();
const loaderContainer = new inversify_1.Container();
loaderContainer.load(mongodb_1.mongodbInfraModule);
loaderContainer.load(app_1.appModule);
loaderContainer.load(http_1.httpInterfaceModule);
(async () => {
    await mongodb_1.start(loaderContainer, process.env.MONGODB_URI);
    http_1.init(loaderContainer);
    http_1.start(parseInt(process.env.HTTP_PORT, 10));
})();

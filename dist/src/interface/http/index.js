"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const bodyParser = require("body-parser");
const user_controller_1 = require("./components/user/user.controller");
const identifiers_1 = require("./identifiers");
const momus_1 = require("./middlewares/momus");
let httpConfig;
exports.httpInterfaceModule = new inversify_1.ContainerModule((bind) => {
    bind(identifiers_1.default.UserController)
        .to(user_controller_1.UserController)
        .inSingletonScope();
});
// start the server
function init(container, config) {
    httpConfig = config;
    let server = new inversify_express_utils_1.InversifyExpressServer(container);
    server.setConfig(app => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });
    server.setErrorConfig(app => {
        app.use(momus_1.default);
    });
    exports.serverInstance = server.build();
    console.log('Server is ready');
}
exports.init = init;
function start() {
    console.log('Server is listening');
    return exports.serverInstance.listen(httpConfig.port);
}
exports.start = start;

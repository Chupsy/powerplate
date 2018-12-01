"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var bodyParser = require("body-parser");
var user_controller_1 = require("./components/user/user.controller");
var identifiers_1 = require("./identifiers");
var momus_1 = require("./middlewares/momus");
exports.httpInterfaceModule = new inversify_1.ContainerModule(function (bind) {
    bind(identifiers_1.default.UserController)
        .to(user_controller_1.UserController)
        .inSingletonScope();
});
// start the server
function init(container) {
    var server = new inversify_express_utils_1.InversifyExpressServer(container);
    server.setConfig(function (app) {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });
    server.setErrorConfig(function (app) {
        app.use(momus_1.default);
    });
    var serverInstance = server.build();
    serverInstance.listen(3000);
    console.log('Server is ready');
}
exports.init = init;

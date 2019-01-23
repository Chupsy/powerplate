import { ContainerModule, interfaces, Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');
import { UserController } from './components/user/user.controller';
import HTTP_INTERFACE_IDENTIFIERS from './identifiers';
import momus from './middlewares/momus';
import { Application } from 'express-serve-static-core';
let httpConfig: any;
export let serverInstance: Application;

export const httpInterfaceModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(HTTP_INTERFACE_IDENTIFIERS.UserController)
        .to(UserController)
        .inSingletonScope();
});

// start the server
export function init(container: Container, config: any) {
    httpConfig = config;
    let server = new InversifyExpressServer(container);

    server.setConfig(app => {
        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        app.use(bodyParser.json());
    });
    server.setErrorConfig(app => {
        app.use(momus);
    });
    serverInstance = server.build();
    console.log('Server is ready');
}
export function start() {
    console.log('Server is listening');
    return serverInstance.listen(httpConfig.port);
}

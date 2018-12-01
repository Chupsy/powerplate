import { ContainerModule, interfaces, Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');
import { UserController } from './components/user/user.controller';
import HTTP_INTERFACE_IDENTIFIERS from './identifiers';
import momus from './middlewares/momus';

export const httpInterfaceModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(HTTP_INTERFACE_IDENTIFIERS.UserController)
        .to(UserController)
        .inSingletonScope();
});

// start the server
export function init(container: Container) {
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

    let serverInstance = server.build();
    serverInstance.listen(3000);
    console.log('Server is ready');
}

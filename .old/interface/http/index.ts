import { ContainerModule, interfaces, Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');
import { UserController } from './components/user/user.controller';
import HTTP_INTERFACE_IDENTIFIERS from './identifiers';

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

    let serverInstance = server.build();
    serverInstance.listen(3000);
}

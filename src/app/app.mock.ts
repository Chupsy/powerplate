import { ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import UserApp from './user/user.app';
import APP_IDENTIFIERS from './identifiers';
import UserAppMock from './user/user.app.mock';

export const appModuleMock = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserApp>(APP_IDENTIFIERS.UserApp)
        .to(UserAppMock)
        .inSingletonScope();
});

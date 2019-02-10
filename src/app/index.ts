import { ContainerModule, interfaces } from 'inversify';
import UserApp from './user/user.app';
import APP_IDENTIFIERS from './identifiers';
import { AuthenticateApp } from './authenticate/authenticate.app';

export const appModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserApp>(APP_IDENTIFIERS.UserApp)
        .to(UserApp)
        .inSingletonScope();
    bind<AuthenticateApp>(APP_IDENTIFIERS.AuthenticateApp)
        .to(AuthenticateApp)
        .inSingletonScope();
});

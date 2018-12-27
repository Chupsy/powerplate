import { ContainerModule, interfaces } from 'inversify';
import UserApp from './user/user.app';
import APP_IDENTIFIERS from './identifiers';

export const appModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserApp>(APP_IDENTIFIERS.UserApp)
        .to(UserApp)
        .inSingletonScope();
});

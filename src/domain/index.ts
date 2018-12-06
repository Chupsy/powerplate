import { ContainerModule, interfaces } from 'inversify';
import UserFactory from './user/user.factory';
import DOMAIN_IDENTIFIERS from './identifiers';

export const domainModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserFactory>(DOMAIN_IDENTIFIERS.UserFactory)
        .to(UserFactory)
        .inSingletonScope();
});

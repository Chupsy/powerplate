import { ContainerModule, interfaces, Container } from 'inversify';
import 'reflect-metadata';
import INFRA_IDENTIFIERS from '../identifiers';
import { UserInfra } from './user/user.infra';
import * as mongoose from 'mongoose';
import { UserResource } from '../resources/user/user.resource';
import { Oauth2TokenInfra } from './oauth2_token/oauth2_token.infra';
import { Oauth2TokenResource } from '../resources/oauth2_token/oauth2_token.resource';

export const mongodbInfraModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserResource>(INFRA_IDENTIFIERS.UserResource)
        .to(UserInfra)
        .inSingletonScope();
    bind<Oauth2TokenResource>(INFRA_IDENTIFIERS.Oauth2TokenResource)
        .to(Oauth2TokenInfra)
        .inSingletonScope();
});

export async function start(container: Container, config: any) {
    await mongoose.connect(
        config.uri,
        { useNewUrlParser: true }
    );
    let userInfra: UserInfra = container.get(INFRA_IDENTIFIERS.UserResource);
    let oauth2Token: Oauth2TokenInfra = container.get(INFRA_IDENTIFIERS.Oauth2TokenResource);
    userInfra.init(mongoose);
    oauth2Token.init(mongoose);
    console.log('database ready');
    return;
}

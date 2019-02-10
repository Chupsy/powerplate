import { ContainerModule, interfaces, Container } from 'inversify';
import 'reflect-metadata';
import INFRA_IDENTIFIERS from '../identifiers';
import { UserInfra } from './user/user.infra';
import * as mongoose from 'mongoose';
import { Oauth2TokenInfra } from './oauth2_token/oauth2_token.infra';

export const mongodbInfraModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserInfra>(INFRA_IDENTIFIERS.UserInfra)
        .to(UserInfra)
        .inSingletonScope();
    bind<Oauth2TokenInfra>(INFRA_IDENTIFIERS.Oauth2TokenInfra)
        .to(Oauth2TokenInfra)
        .inSingletonScope();
});

export async function start(container: Container, uri: string) {
    await mongoose.connect(
        uri,
        { useNewUrlParser: true }
    );
    let userInfra: UserInfra = container.get(INFRA_IDENTIFIERS.UserInfra);
    let oauth2Token: Oauth2TokenInfra = container.get(INFRA_IDENTIFIERS.Oauth2TokenInfra);
    userInfra.init(mongoose);
    oauth2Token.init(mongoose);
    console.log('database ready');
    return;
}

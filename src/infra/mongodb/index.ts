import { ContainerModule, interfaces, Container } from 'inversify';
import 'reflect-metadata';
import INFRA_IDENTIFIERS from '../identifiers';
import { UserInfra } from './user/user.infra';
import * as mongoose from 'mongoose';
import { UserResource } from '../resources/user/user.resource';

export const mongodbInfraModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserResource>(INFRA_IDENTIFIERS.UserResource)
        .to(UserInfra)
        .inSingletonScope();
});

export async function start(container: Container, config: any) {
    await mongoose.connect(
        config.uri,
        { useNewUrlParser: true }
    );
    let userInfra: UserInfra = container.get(INFRA_IDENTIFIERS.UserResource);
    userInfra.init(mongoose);
    console.log('database ready');
    return;
}

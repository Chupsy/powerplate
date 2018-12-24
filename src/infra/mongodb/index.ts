import { ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import INFRA_IDENTIFIERS from './identifiers';
import { UserInfra } from './user/user.infra';
const uri = 'mongodb://127.0.0.1:27017/local';
import * as mongoose from 'mongoose';

export const mongodbInfraModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserInfra>(INFRA_IDENTIFIERS.UserInfra)
        .to(UserInfra)
        .inSingletonScope();
});

export async function start() {
    await mongoose.connect(
        uri,
        { useNewUrlParser: true }
    );
    console.log('database ready');
    return;
}

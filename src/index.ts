import 'reflect-metadata';
import { Container } from 'inversify';
import { httpInterfaceModule, init as httpInit, start as httpStart } from './interface/http';
import { appModule } from './app';
import { mongodbInfraModule, start as databaseStart } from './infra/mongodb';

const loaderContainer = new Container();
loaderContainer.load(mongodbInfraModule);
loaderContainer.load(appModule);
loaderContainer.load(httpInterfaceModule);
(async () => {
    await databaseStart();
    httpInit(loaderContainer);
    httpStart();
})();

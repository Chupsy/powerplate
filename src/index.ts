import 'reflect-metadata';
import { Container } from 'inversify';
import { httpInterfaceModule, init as httpInit, start as httpStart } from './interface/http';
import { appModule } from './app';
import { mongodbInfraModule, start as databaseStart } from './infra/mongodb';
import config from './../config';

const loaderContainer = new Container();
loaderContainer.load(mongodbInfraModule);
loaderContainer.load(appModule);
loaderContainer.load(httpInterfaceModule);
(async () => {
    await databaseStart(loaderContainer, config.infra.mongodb);
    httpInit(loaderContainer, config.interface.http);
    httpStart();
})();

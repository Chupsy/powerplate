import 'reflect-metadata';
import { Container } from 'inversify';
import { httpInterfaceModule, init as httpInit, start as httpStart } from './interface/http';
import { appModule } from './app';
import { mongodbInfraModule, start as databaseStart } from './infra/mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
const loaderContainer = new Container();
loaderContainer.load(mongodbInfraModule);
loaderContainer.load(appModule);
loaderContainer.load(httpInterfaceModule);
(async () => {
    await databaseStart(loaderContainer, process.env.MONGODB_URI);
    httpInit(loaderContainer);
    httpStart(parseInt(process.env.HTTP_PORT, 10));
})();

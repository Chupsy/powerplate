import 'reflect-metadata';
import { Container } from 'inversify';
import { httpInterfaceModule, init as httpInit, start as httpStart } from './interface/http';
import { appModule } from './app';

const loaderContainer = new Container();
loaderContainer.load(appModule);
loaderContainer.load(httpInterfaceModule);

httpInit(loaderContainer);
httpStart();

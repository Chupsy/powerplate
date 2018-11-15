import "reflect-metadata";
import { Container } from "inversify";
import { infraModule } from "./infra";
import { domainModule } from "./domain";
import { appModule } from "./app";
import { httpInterfaceModule, init as httpInit } from "./interface/http";

const loaderContainer = new Container();
loaderContainer.load(infraModule);
loaderContainer.load(domainModule);
loaderContainer.load(appModule);
loaderContainer.load(httpInterfaceModule);

httpInit(loaderContainer);

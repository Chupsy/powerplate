import "reflect-metadata";
import { Container } from "inversify";
import { userInfraModule } from "./infra/user/user.module";
import { userFactoryModule } from "./domain/user/user.module";
import { userAppModule } from "./app/user/user.module";
import UserApp from "./app/user/user.app";

const loaderContainer = new Container();
loaderContainer.load(userInfraModule);
loaderContainer.load(userFactoryModule);
loaderContainer.load(userAppModule);

export default loaderContainer.resolve<UserApp>(UserApp);
import { Container } from "inversify";
import { userFactoryModule } from "./user/user.module";

export const domainContainer = new Container();
domainContainer.load(userFactoryModule)
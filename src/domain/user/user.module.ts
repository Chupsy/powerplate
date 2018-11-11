import { ContainerModule, interfaces } from "inversify";
import { UserFactory } from "./userFactory";
import DOMAIN_IDENTIFIERS from "../identifiers";
// import {infraContainer} from "../../infra";

export const userFactoryModule = new ContainerModule((bind: interfaces.Bind)=>{
    bind<UserFactory>(DOMAIN_IDENTIFIERS.UserFactory).to(UserFactory).inSingletonScope();
})
// export const userFactory = infraContainer.resolve<UserFactory>(UserFactory); 

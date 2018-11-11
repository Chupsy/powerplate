import { ContainerModule, interfaces } from "inversify";
import UserApp from "./user.app";
import APP_IDENTIFIERS from "../identifiers";
import { domainContainer } from "../../domain";

export const userAppModule = new ContainerModule((bind: interfaces.Bind)=>{
    bind<UserApp>(APP_IDENTIFIERS.UserApp).to(UserApp).inSingletonScope();
})
// export const userApp = domainContainer.resolve<UserApp>(UserApp); 

import { ContainerModule, interfaces } from "inversify";
import { UserInfra } from "./userInfra";
import INFRA_IDENTIFIERS from "../identifiers";

export const userInfraModule = new ContainerModule((bind: interfaces.Bind)=>{
    bind<UserInfra>(INFRA_IDENTIFIERS.UserInfra).to(UserInfra).inSingletonScope();
})

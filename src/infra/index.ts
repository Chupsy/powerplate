import { ContainerModule, interfaces } from "inversify";
import { UserInfra } from "./user/userInfra";
import INFRA_IDENTIFIERS from "./identifiers";

export const infraModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserInfra>(INFRA_IDENTIFIERS.UserInfra).to(UserInfra).inSingletonScope();
});

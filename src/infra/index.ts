import { Container } from "inversify";
import {userInfraModule} from "./user/user.module";
export const infraContainer = new Container();
infraContainer.load(userInfraModule)
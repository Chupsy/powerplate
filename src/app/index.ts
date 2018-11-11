import { Container } from "inversify";
import "reflect-metadata";
import {userAppModule} from "./user/user.module";

export const appContainer = new Container();
appContainer.load(userAppModule)
import { interfaces, httpGet, controller, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import APP_IDENTIFIERS from "../../../../app/identifiers";
import UserApp, { IUser } from "../../../../app/user/user.app";
@controller("/users")
export class UserController implements interfaces.Controller {
    constructor(@inject(APP_IDENTIFIERS.UserApp) private userApp: UserApp) {}

    @httpGet("/:id")
    public getUser(@requestParam("id") id: string): IUser {
        return this.userApp.proceed(Number(id));
    }
}

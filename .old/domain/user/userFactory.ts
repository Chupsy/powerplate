import { injectable, inject } from "inversify";
import { User } from "./user";
import { UserInfra } from "../../infra/user/userInfra";
import INFRA_IDENTIFIERS from "../../infra/identifiers";
import { IUser } from "../../app/user/user.app";

@injectable()
export class UserFactory implements UserFactory {
    protected userInfra: UserInfra;

    constructor(@inject(INFRA_IDENTIFIERS.UserInfra) userInfra: UserInfra) {
        this.userInfra = userInfra;
    }

    public createUser(iUser: IUser) {
        const newUser = new User(iUser.name, iUser.age);
        this.userInfra.createUser(newUser);
        return newUser;
    }
}

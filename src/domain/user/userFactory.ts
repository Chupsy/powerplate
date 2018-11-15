import { injectable, inject } from "inversify";
import { User } from "./user";
import { UserInfra } from "../../infra/user/userInfra";
import INFRA_IDENTIFIERS from "../../infra/identifiers";

@injectable()
export class UserFactory implements UserFactory {
    protected userInfra: UserInfra;

    constructor(@inject(INFRA_IDENTIFIERS.UserInfra) userInfra: UserInfra) {
        this.userInfra = userInfra;
    }

    public createUser(name: string, age: number) {
        const newUser = new User(name, age);
        this.userInfra.createUser(newUser);
        return newUser;
    }
}

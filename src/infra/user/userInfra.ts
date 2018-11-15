import { injectable } from "inversify";
import { User } from "../../domain/user/user";
import { UserMapper } from "./userMapper";

@injectable()
export class UserInfra {

    public createUser(user: User) {
        const serializedUser = UserMapper.serialize(user);
        console.log(serializedUser.toDatabase());
    }

    public test(text: string) {
        console.log(text);
    }
}

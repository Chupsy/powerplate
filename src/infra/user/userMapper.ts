import { User } from "../../domain/user/user";
import { injectable } from "inversify";
import UserModel from "./userModel";

@injectable()
export class UserMapper {
    public deserialize(userModel) {
        return new User(userModel.name, userModel.age);
    }
}

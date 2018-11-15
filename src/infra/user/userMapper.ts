import { User } from "../../domain/user/user";

export class UserMapper {
    public age: number;
    public name: string;

    public static serialize(user: User) {
        return new UserMapper(user.name, user.age);
    }

    constructor(name: string, age: number) {
        (this.name = name), (this.age = age);
    }

    public deserialize() {
        return new User(this.name, this.age);
    }

    public toDatabase() {
        return {
            age: this.age,
            name: this.name
        };
    }
}

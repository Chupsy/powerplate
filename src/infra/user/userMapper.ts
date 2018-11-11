import { User } from "../../domain/user/user";

export class UserMapper{

    public name : string;
    public age: number;

    constructor(name: string, age: number){
        this.name = name,
        this.age = age;
    }

    public static serialize(user: User){
        return new UserMapper(user.name, user.age)
    }

    public deserialize(){
        return new User(this.name, this.age);
    }

    public toDatabase(){
        return {
            name: this.name,
            age: this.age
        }
    }
}
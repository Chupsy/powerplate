import { injectable } from "inversify";

@injectable()
export class User {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public growUp() {
        this.age ++;
    }

    public displayAge() {
        return `${this.name} is ${this.age} years old`;
    }

}

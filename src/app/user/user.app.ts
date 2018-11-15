import { injectable, inject } from "inversify";
import { UserFactory } from "../../domain/user/userFactory";
import domainIdentifiers from "../../domain/identifiers";
export interface IUser {
    name: string;
    age: number;
}

@injectable()
export default class UserApp {
    protected userFactory: UserFactory;

    constructor(@inject(domainIdentifiers.UserFactory) userFactory: UserFactory) {
        this.userFactory = userFactory;
    }

    public proceed(id: number): IUser {
        const user1 = this.userFactory.createUser("vincent", id);
        console.log(user1.displayAge());
        user1.growUp();
        console.log(user1.displayAge());
        return user1.toInterface();
    }
}

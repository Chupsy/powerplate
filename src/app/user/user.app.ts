import { injectable, inject } from "inversify";
import { UserFactory } from "../../domain/user/userFactory";
import domainIdentifiers from "../../domain/identifiers";

@injectable()
export default class UserApp {
    protected userFactory: UserFactory;

    constructor(
        @inject(domainIdentifiers.UserFactory) userFactory: UserFactory
    ){
        this.userFactory = userFactory;
    }

    public proceed(){
        const user1 = this.userFactory.createUser("vincent", 28);
        console.log(user1.displayAge());
        user1.growUp();
        console.log(user1.displayAge());
    }
}
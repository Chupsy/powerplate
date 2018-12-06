import { injectable, inject } from 'inversify';
import UserFactory from './../../domain/user/user.factory';
import DOMAIN_IDENTIFIERS from '../../domain/identifiers';
@injectable()
export default class UserApp {

    protected userFactory: UserFactory;

    constructor(@inject(DOMAIN_IDENTIFIERS.UserFactory) userFactory: UserFactory) {
        this.userFactory = userFactory;
    }

    public findUserById(userId: number): object {
        return this.userFactory.findUserById(userId);
    }

    public findAllUsers(): object {
        return this.userFactory.findAllUsers();
    }

    public deleteUserById(userId: number): void {
        return this.userFactory.deleteUserById(userId);
    }

    public createUser(userToCreate: { email: string; firstName: string; lastName: string; age: number }): object {
        return this.userFactory.createUser(userToCreate);
    }
    public updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): object {
        return this.userFactory.updateUser(userId, dataToUpdate);
    }
}

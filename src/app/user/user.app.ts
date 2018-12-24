import { injectable, inject } from 'inversify';
import UserFactory from './../../domain/user/user.factory';
import DOMAIN_IDENTIFIERS from '../../domain/identifiers';
@injectable()
export default class UserApp {
    protected userFactory?: UserFactory;

    constructor(@inject(DOMAIN_IDENTIFIERS.UserFactory) userFactory: UserFactory) {
        this.userFactory = userFactory;
    }

    public async findUserById(userId: number): Promise<object> {
        return await this.userFactory.findUserById(userId);
    }

    public async findAllUsers(): Promise<object[]> {
        return await this.userFactory.findAllUsers();
    }

    public async deleteUserById(userId: number): Promise<void> {
        return await this.userFactory.deleteUserById(userId);
    }

    public async createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        age: number;
    }): Promise<object> {
        return await this.userFactory.createUser(userToCreate);
    }
    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<object> {
        return await this.userFactory.updateUser(userId, dataToUpdate);
    }
}

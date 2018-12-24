import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/mongodb/identifiers';
import { UserInfra } from '../../infra/mongodb/user/user.infra';

@injectable()
export default class UserFactory {
    protected userInfra?: UserInfra;

    constructor(@inject(INFRA_IDENTIFIERS.UserInfra) userInfra: UserInfra) {
        this.userInfra = userInfra;
    }

    public async findUserById(userId: number): Promise<object> {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return foundUser;
    }

    public async findAllUsers(): Promise<object[]> {
        return await this.userInfra.findAllUsers();
    }

    public async deleteUserById(userId: number): Promise<void> {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return await this.userInfra.deleteUserById(userId);
    }

    public async createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        age: number;
    }): Promise<object> {
        await this.verifyEmail(userToCreate.email);
        if (userToCreate.age <= 0) {
            throw new Error('invalid_age');
        }
        let createdUser = await this.userInfra.createUser({ ...userToCreate });

        return createdUser;
    }
    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<object> {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        if (dataToUpdate.age <= 0) {
            throw new Error('invalid_age');
        }
        if (dataToUpdate.email) {
            await this.verifyEmail(dataToUpdate.email, userId);
        }
        return await this.userInfra.updateUser(userId, dataToUpdate);
    }

    public async verifyEmail(email: string, userId?: number): Promise<void> {
        let user = await this.userInfra.findUserByEmail(email);
        if (user && (!userId || userId !== user.userId)) {
            throw new Error('email_already_used');
        }
    }
}

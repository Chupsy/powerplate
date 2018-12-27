import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { UserResource } from '../../infra/resources/user/user.resource';

@injectable()
export default class UserApp {
    protected userResource?: UserResource;

    constructor(@inject(INFRA_IDENTIFIERS.UserResource) userResource: UserResource) {
        this.userResource = userResource;
    }

    public async findUserById(userId: number): Promise<object> {
        const foundUser = await this.userResource.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return foundUser;
    }

    public async findAllUsers(): Promise<object[]> {
        return await this.userResource.findAllUsers();
    }

    public async deleteUserById(userId: number): Promise<void> {
        const foundUser = await this.userResource.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return await this.userResource.deleteUserById(userId);
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
        let createdUser = await this.userResource.createUser({ ...userToCreate });

        return createdUser;
    }
    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<object> {
        const foundUser = await this.userResource.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        if (dataToUpdate.age <= 0) {
            throw new Error('invalid_age');
        }
        dataToUpdate.email && (await this.verifyEmail(dataToUpdate.email, userId));
        return await this.userResource.updateUser(userId, dataToUpdate);
    }

    public async verifyEmail(email: string, userId?: number): Promise<void> {
        let user = await this.userResource.findUserByEmail(email);
        if (user && (!userId || userId !== user.userId)) {
            throw new Error('email_already_used');
        }
    }
}

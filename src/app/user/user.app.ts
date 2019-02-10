import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import User from './user';
import * as crypto from 'crypto';
import sha256 = require('sha256');
import { UserInfra } from '../../infra/mongodb/user/user.infra';

@injectable()
export default class UserApp {
    protected userInfra?: UserInfra;

    constructor(@inject(INFRA_IDENTIFIERS.UserInfra) userInfra: UserInfra) {
        this.userInfra = userInfra;
    }

    public async findUserById(userId: number): Promise<object> {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return new User(this.userInfra, foundUser).export();
    }

    public async findAllUsers(): Promise<object[]> {
        const users = await this.userInfra.findAllUsers();
        return users.map(user => new User(this.userInfra, user).export());
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
        password: string;
    }): Promise<object> {
        await this.verifyEmail(userToCreate.email);
        if (userToCreate.age <= 0) {
            throw new Error('invalid_age');
        }
        const passwordSalt = crypto.randomBytes(32).toString('hex');
        let createdUser = await this.userInfra.createUser({
            ...userToCreate,
            password: sha256(userToCreate.password + sha256(passwordSalt)),
            passwordSalt
        });

        return new User(this.userInfra, createdUser).export();
    }
    public async updateUser(
        userId: number,
        dataToUpdate: {
            email?: string;
            firstName?: string;
            lastName?: string;
            age?: number;
            password?: string;
            oldPassword?: string;
        }
    ): Promise<object> {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        dataToUpdate.email && (await this.verifyEmail(dataToUpdate.email, userId));
        const user = new User(this.userInfra, foundUser);
        await user.update(dataToUpdate);
        return user.export();
    }

    public async verifyEmail(email: string, userId?: number): Promise<void> {
        let user = await this.userInfra.findUserByEmail(email);
        if (user && (!userId || userId !== user.userId)) {
            throw new Error('email_already_used');
        }
    }

    public async findUserByEmail(email: string): Promise<User> {
        let foundUser = await this.userInfra.findUserByEmail(email);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return new User(this.userInfra, foundUser);
    }
}

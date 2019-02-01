import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { UserResource } from '../../infra/resources/user/user.resource';
import User from './user';
import * as crypto from 'crypto';
import sha256 = require('sha256');
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';

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
        return new User(this.userResource, foundUser).export();
    }

    public async findAllUsers(): Promise<object[]> {
        const users = await this.userResource.findAllUsers();
        return users.map(user => new User(this.userResource, user).export());
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
        password: string;
    }): Promise<object> {
        await this.verifyEmail(userToCreate.email);
        if (userToCreate.age <= 0) {
            throw new Error('invalid_age');
        }
        const passwordSalt = crypto.randomBytes(32).toString('hex');
        let createdUser = await this.userResource.createUser({
            ...userToCreate,
            password: sha256(userToCreate.password + sha256(passwordSalt)),
            passwordSalt
        });

        return new User(this.userResource, createdUser).export();
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
        const foundUser = await this.userResource.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        dataToUpdate.email && (await this.verifyEmail(dataToUpdate.email, userId));
        const user = new User(this.userResource, foundUser);
        await user.update(dataToUpdate);
        return user.export();
    }

    public async verifyEmail(email: string, userId?: number): Promise<void> {
        let user = await this.userResource.findUserByEmail(email);
        if (user && (!userId || userId !== user.userId)) {
            throw new Error('email_already_used');
        }
    }

    public async authenticateUser(
        authData: { email?: string; password?: string; bearerToken?: string },
        strategy: AUTHENTICATION_STRATEGY
    ): Promise<object> {
        if (strategy === AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password) {
            let foundUser = await this.userResource.findUserByEmail(authData.email);
            if (!foundUser) {
                throw new Error('data_not_found');
            }
            const user = new User(this.userResource, foundUser);
            if (!user.verifyPassword(authData.password)) {
                throw new Error('invalid_password');
            }
            return user;
        }
        throw new Error('invalid_parameters');
    }

    public async findUserByEmail(email: string): Promise<User> {
        let foundUser = await this.userResource.findUserByEmail(email);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return new User(this.userResource, foundUser);
    }
}

import { injectable, inject } from 'inversify';

import * as sha256 from 'sha256';
import { UserResource } from '../../infra/resources/user/user.resource';

@injectable()
export default class User {
    public userId: number;
    public email: string;
    public firstName: string;
    public lastName: string;
    public age: number;
    public password: string;
    public passwordSalt: string;
    private userResource: UserResource;
    constructor(
        userResource: UserResource,
        userData: {
            userId: number;
            email: string;
            firstName: string;
            lastName: string;
            age: number;
            password: string;
            passwordSalt: string;
        }
    ) {
        this.updateData(userData);
        this.userResource = userResource;
    }

    public async update(dataToUpdate: {
        email?: string;
        firstName?: string;
        lastName?: string;
        age?: number;
        password?: string;
        oldPassword?: string;
    }): Promise<void> {
        if (dataToUpdate.age <= 0) {
            throw new Error('invalid_age');
        }
        if (dataToUpdate.password) {
            if (!dataToUpdate.oldPassword) {
                throw new Error('missing_parameters');
            }
            if (!this.verifyPassword(dataToUpdate.oldPassword)) {
                throw new Error('invalid_old_password');
            }
            dataToUpdate.password = sha256(dataToUpdate.password + sha256(this.passwordSalt));
            delete dataToUpdate.oldPassword;
        }
        const updatedData = await this.userResource.updateUser(this.userId, dataToUpdate);
        this.updateData(updatedData);
    }

    public export(): { userId: number; email: string; firstName: string; lastName: string; age: number } {
        return {
            userId: this.userId,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age
        };
    }
    public verifyPassword(password: string) {
        return this.password === sha256(password + sha256(this.passwordSalt));
    }

    private updateData(userData: {
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        age: number;
        password: string;
        passwordSalt: string;
    }) {
        this.userId = userData.userId;
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.password = userData.password;
        this.passwordSalt = userData.passwordSalt;
        this.age = userData.age;
    }
}

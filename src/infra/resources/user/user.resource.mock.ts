import { injectable, inject } from 'inversify';
import { UserResource } from './user.resource';
import * as sha256 from 'sha256';

@injectable()
export default class UserResourceMock implements UserResource {
    public User: any;
    public async findUserById(userId: number): Promise<any> {
        if (userId !== 1) {
            return null;
        }
        return {
            userId: 1,
            firstName: 'fName',
            lastName: 'lName',
            age: 12,
            email: 'valid@user.com',
            password: sha256('azerty' + sha256('1234AZER')),
            passwordSalt: '1234AZER'
        };
    }
    public async findAllUsers(): Promise<any[]> {
        return [
            {
                userId: 1
            },
            {
                userId: 2
            }
        ];
    }
    public async deleteUserById(): Promise<void> {
        return;
    }

    public async createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        age: number;
    }): Promise<any> {
        return { userId: 1, ...userToCreate };
    }

    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<any> {
        return {
            userId,
            firstName: 'fName',
            lastName: 'lName',
            age: 12,
            email: 'valid@user.com',
            password: sha256('azerty' + sha256('1234AZER')),
            passwordSalt: '1234AZER',
            ...dataToUpdate
        };
    }
    public async findUserByEmail(email: string): Promise<any> {
        if (email === 'email@already.used') {
            return {
                userId: 5,
                firstName: 'fName',
                lastName: 'lName',
                age: 12,
                email: 'email@already.used',
                password: sha256('azerty' + sha256('1234AZER')),
                passwordSalt: '1234AZER'
            };
        }
        return null;
    }
}

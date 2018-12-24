import { injectable, inject } from 'inversify';
import UserApp from './user.app';
import UserFactory from '../../domain/user/user.factory';

@injectable()
export default class UserAppMock implements UserApp {
    public async findUserById(userId: number): Promise<object> {
        if (userId !== 1) {
            throw new Error('data_not_found');
        }
        return {
            userId: 1
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
    }): Promise<object> {
        return { userId: 1, ...userToCreate };
    }

    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<object> {
        return { userId, ...dataToUpdate };
    }
}

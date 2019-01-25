import { injectable, inject } from 'inversify';
import UserFactory from './user.app';
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';

@injectable()
export default class UserFactoryMock implements UserFactory {
    public async findUserById(userId: number): Promise<object> {
        if (userId !== 1) {
            throw new Error('data_not_found');
        }
        return {
            userId: 1
        };
    }
    public async findAllUsers(): Promise<object[]> {
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
    public async verifyEmail(): Promise<void> {
        return null;
    }

    public async authenticateUser(
        authData: { email: string; password: string },
        strategy: AUTHENTICATION_STRATEGY
    ): Promise<object> {
        if (authData.email !== 'test@test.com') {
            throw new Error('data_not_found');
        }
        if (authData.password !== 'azerty') {
            throw new Error('invalid_password');
        }
        return {
            userId: 1,
            email: 'test@test.com',
            age: 12
        };
    }
}

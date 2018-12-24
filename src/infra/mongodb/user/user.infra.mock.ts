import { injectable, inject } from 'inversify';
import { UserInfra } from './user.infra';

@injectable()
export default class UserInfraMock implements UserInfra {
    public User: any;
    public async findUserById(userId: number): Promise<any> {
        if (userId !== 1) {
            return null;
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
    }): Promise<any> {
        return { userId: 1, ...userToCreate };
    }

    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<any> {
        return { userId, ...dataToUpdate };
    }
    public async findUserByEmail(email: string): Promise<any> {
        if (email === 'email@already.used') {
            return {};
        }
        return null;
    }
}

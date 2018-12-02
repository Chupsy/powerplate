import { injectable, inject } from 'inversify';
import UserApp from './user.app';

@injectable()
export default class UserAppMock implements UserApp {
    public findUserById(userId: number): object {
        if (userId !== 1) {
            throw new Error('data_not_found');
        }
        return {
            userId: 1
        };
    }
    public findAllUsers(): object {
        return [
            {
                userId: 1
            },
            {
                userId: 2
            }
        ];
    }
    public deleteUserById(): void {
        return;
    }

    public createUser(userToCreate: { email: string; firstName: string; lastName: string; age: number }): object {
        return { userId: 1, ...userToCreate };
    }

    public updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): object {
        return { userId, ...dataToUpdate };
    }
}

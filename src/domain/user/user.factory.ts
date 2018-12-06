import { injectable } from 'inversify';

@injectable()
export default class UseFactory {

    public findUserById(userId: number): object {
        return {};
    }

    public findAllUsers(): object {
        return {};
    }

    public deleteUserById(userId: number): void {
        return;
    }

    public createUser(userToCreate: { email: string; firstName: string; lastName: string; age: number }): object {
        return userToCreate;
    }
    public updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): object {
        return dataToUpdate;
    }
}

export abstract class UserResource {
    public findUserById(userId: number): Promise<IUser> {
        throw new Error('no_implemented_yet');
    }
    public findAllUsers(): Promise<IUser[]> {
        throw new Error('no_implemented_yet');
    }
    public deleteUserById(userId: number): Promise<void> {
        throw new Error('no_implemented_yet');
    }
    public createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        age: number;
    }): Promise<IUser> {
        throw new Error('no_implemented_yet');
    }
    public updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<IUser> {
        throw new Error('no_implemented_yet');
    }
    public findUserByEmail(email: string): Promise<IUser> {
        throw new Error('no_implemented_yet');
    }
}

export interface IUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
}

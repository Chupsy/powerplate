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
}

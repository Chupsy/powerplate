import { injectable } from 'inversify';

@injectable()
export default class UserApp {
    public findUserById(userId: number): object {
        return {};
    }
}

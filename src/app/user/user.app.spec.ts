import { expect } from 'chai';
import 'mocha';
import 'reflect-metadata';
import UserApp from './user.app';
import { Container } from 'inversify';
import APP_IDENTIFIERS from '../identifiers';
import UserFactory from './../../domain/user/user.factory';
import UserFactoryMock from './../../domain/user/user.factory.mock';
import DOMAIN_IDENTIFIERS from '../../domain/identifiers';

let userApp: UserApp;
beforeEach(() => {
    const container = new Container();
    container.bind<UserFactory>(DOMAIN_IDENTIFIERS.UserFactory).to(UserFactoryMock);
    container
        .bind<UserApp>(APP_IDENTIFIERS.UserApp)
        .to(UserApp)
        .inSingletonScope();
    userApp = container.get<UserApp>(APP_IDENTIFIERS.UserApp);
});

describe('User App', () => {
    it('should allow findUserById', async () => {
        let user: any = await userApp.findUserById(1);
        expect(user.userId).equal(1);
    });
    it('should allow findAllUsers', async () => {
        let users: any[] = await userApp.findAllUsers();
        expect(users[0].userId).equal(1);
        expect(users[1].userId).equal(2);
    });
    it('should allow deleteUser', () => {
        expect(() => userApp.deleteUserById(1)).not.to.throw();
    });
    it('should allow createUser', async () => {
        let user: any = await userApp.createUser({
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(user.userId).equal(1);
        expect(user.email).equal('test@test.test');
    });
    it('should allow updateUser', async () => {
        let updatedUser: any = await userApp.updateUser(1, {
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(updatedUser.userId).equal(1);
    });
});

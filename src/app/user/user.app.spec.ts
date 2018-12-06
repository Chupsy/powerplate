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
    it('should allow findUserById', () => {
        expect(userApp.findUserById(1)).to.exist;
    });
    it('should allow findAllUsers', () => {
        expect(userApp.findAllUsers()).to.exist;
    });
    it('should allow deleteUser', () => {
        userApp.deleteUserById(1);
        expect(userApp.deleteUserById).to.exist;
    });
    it('should allow createUser', () => {
        userApp.createUser({
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(userApp.createUser).to.exist;
    });
    it('should allow updateUser', () => {
        userApp.updateUser(1, {
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(userApp.updateUser).to.exist;
    });
});

import { expect, assert } from 'chai';
import 'mocha';
import 'reflect-metadata';
import UserApp from './user.app';
import DOMAIN_IDENTIFIERS from '../identifiers';
import { Container } from 'inversify';
import UserInfraMock from '../../infra/resources/user/user.resource.mock';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { UserResource } from '../../infra/resources/user/user.resource';
let userApp: UserApp;
beforeEach(() => {
    const container = new Container();
    container.bind<UserResource>(INFRA_IDENTIFIERS.UserResource).to(UserInfraMock);
    container
        .bind<UserApp>(DOMAIN_IDENTIFIERS.UserApp)
        .to(UserApp)
        .inSingletonScope();
    userApp = container.get<UserApp>(DOMAIN_IDENTIFIERS.UserApp);
});

describe('User App', () => {
    it('should allow findUserById if it exist', async () => {
        let user: any = await userApp.findUserById(1);
        expect(user.userId).equal(1);
    });
    it('should throw findUserById if it does not exist', async () => {
        try {
            await userApp.findUserById(2);
            assert.fail('factory should throw an error if user does not exist');
        } catch (error) {
            expect(error.message).equal('data_not_found');
        }
    });
    it('should return all users found', async () => {
        let users: any[] = await userApp.findAllUsers();
        expect(users[0].userId).equal(1);
        expect(users[1].userId).equal(2);
    });
    it('should delete user if it exist', () => {
        expect(() => userApp.deleteUserById(1)).not.to.throw();
    });
    it('should throw if trying to delete user that does not exist', async () => {
        try {
            await userApp.deleteUserById(2);
            assert.fail('factory should throw an error if user does not exist');
        } catch (error) {
            expect(error.message).equal('data_not_found');
        }
    });
    it('should allow createUser if valid email address', async () => {
        let user: any = await userApp.createUser({
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(user.userId).equal(1);
    });
    it('should not allow createUser if invalid email address', async () => {
        let userData = {
            email: 'email@already.used',
            firstName: 'test',
            lastName: 'test',
            age: 12
        };
        try {
            await userApp.createUser(userData);
            assert.fail('factory should throw an error if email already used');
        } catch (error) {
            expect(error.message).equal('email_already_used');
        }
    });
    it('should not allow createUser if age is not valid', async () => {
        let userData = {
            email: 'not@used.email',
            firstName: 'test',
            lastName: 'test',
            age: -2
        };
        try {
            await userApp.createUser(userData);
            assert.fail('factory should throw an error if invalid age is provided');
        } catch (error) {
            expect(error.message).equal('invalid_age');
        }
    });
    it('should allow updateUser if data is valid', async () => {
        let updatedUser: any = await userApp.updateUser(1, {
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(updatedUser.userId).equal(1);
        expect(updatedUser.email).equal('test@test.test');
    });
    it('should not allow updateUser if email is invalid', async () => {
        let dataToUpdate = {
            email: 'email@already.used',
            firstName: 'test',
            lastName: 'test',
            age: 12
        };
        try {
            await userApp.updateUser(1, dataToUpdate);
            assert.fail('factory should throw an error if email already used');
        } catch (error) {
            expect(error.message).equal('email_already_used');
        }
    });
    it('should not allow updateUser if data is not found', async () => {
        let dataToUpdate = {
            email: 'not@used.email',
            firstName: 'test',
            lastName: 'test',
            age: 12
        };
        try {
            await userApp.updateUser(2, dataToUpdate);
            assert.fail('factory should throw an error if data is not found');
        } catch (error) {
            expect(error.message).equal('data_not_found');
        }
    });
    it('should not allow updateUser if age is invalid', async () => {
        let dataToUpdate = {
            firstName: 'test',
            lastName: 'test',
            age: -1
        };
        try {
            await userApp.updateUser(1, dataToUpdate);
            assert.fail('factory should throw an error if age is invalid');
        } catch (error) {
            expect(error.message).equal('invalid_age');
        }
    });
});

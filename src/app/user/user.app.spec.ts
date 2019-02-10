import { expect, assert } from 'chai';
import 'mocha';
import 'reflect-metadata';
import UserApp from './user.app';
import * as sinon from 'sinon';
import * as sha256 from 'sha256';
import { UserInfra } from '../../infra/mongodb/user/user.infra';

let sandbox = sinon.createSandbox();
let userInfra = new UserInfra();

let defaultUser = {
    userId: 1,
    firstName: 'fName1',
    lastName: 'lName1',
    age: 12,
    email: 'valid1@user.com',
    password: sha256('azerty' + sha256('1234AZER')),
    passwordSalt: '1234AZER'
};

afterEach(() => {
    sandbox.restore();
});

describe('User App', () => {
    describe('findUser', () => {
        it('should allow findUserById if it exist', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
            let user: any = await userApp.findUserById(1);
            expect(user.userId).equal(1);
        });
        it('should throw findUserById if it does not exist', async () => {
            sandbox.stub(userInfra, 'findUserById').returns(Promise.resolve(null));
            let userApp = new UserApp(userInfra);
            try {
                await userApp.findUserById(2);
                assert.fail('factory should throw an error if user does not exist');
            } catch (error) {
                expect(error.message).equal('data_not_found');
            }
        });
    });
    describe('findAllUsers', () => {
        it('should return all users found', async () => {
            sandbox.stub(userInfra, 'findAllUsers').resolves([
                defaultUser,
                {
                    userId: 2,
                    firstName: 'fName2',
                    lastName: 'lName2',
                    age: 12,
                    email: 'valid2@user.com',
                    password: sha256('azerty' + sha256('1234AZER')),
                    passwordSalt: '1234AZER'
                }
            ]);
            let userApp = new UserApp(userInfra);
            let users: any[] = await userApp.findAllUsers();
            expect(users[0].userId).equal(1);
            expect(users[1].userId).equal(2);
        });
    });
    describe('deleteUser', () => {
        it('should delete user if it exist', () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            sandbox.stub(userInfra, 'deleteUserById').resolves();
            let userApp = new UserApp(userInfra);
            expect(() => userApp.deleteUserById(1)).not.to.throw();
        });
        it('should throw if trying to delete user that does not exist', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(null);
            let userApp = new UserApp(userInfra);
            try {
                await userApp.deleteUserById(2);
                assert.fail('factory should throw an error if user does not exist');
            } catch (error) {
                expect(error.message).equal('data_not_found');
            }
        });
    });
    describe('createUser', () => {
        it('should allow createUser if valid email address', async () => {
            sandbox.stub(userInfra, 'findUserByEmail').resolves(null);
            sandbox.stub(userInfra, 'createUser').resolves({
                userId: 1,
                email: 'test@test.test',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty',
                passwordSalt: '1234AZER'
            });
            let userApp = new UserApp(userInfra);
            let user: any = await userApp.createUser({
                email: 'test@test.test',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty'
            });
            expect(user.userId).equal(1);
        });
        it('should not allow createUser if invalid email address', async () => {
            sandbox.stub(userInfra, 'findUserByEmail').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
            let userData = {
                email: 'email@already.used',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty'
            };
            try {
                await userApp.createUser(userData);
                assert.fail('factory should throw an error if email already used');
            } catch (error) {
                expect(error.message).equal('email_already_used');
            }
        });
        it('should not allow createUser if age is not valid', async () => {
            sandbox.stub(userInfra, 'findUserByEmail').resolves(null);
            let userApp = new UserApp(userInfra);
            let userData = {
                email: 'not@used.email',
                firstName: 'test',
                lastName: 'test',
                age: -2,
                password: 'azerty'
            };
            try {
                await userApp.createUser(userData);
                assert.fail('factory should throw an error if invalid age is provided');
            } catch (error) {
                expect(error.message).equal('invalid_age');
            }
        });
    });
    describe('updateUser', () => {
        it('should allow updateUser if data is valid', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            sandbox.stub(userInfra, 'findUserByEmail').resolves(null);
            sandbox.stub(userInfra, 'updateUser').resolves({
                userId: 1,
                email: 'test@test.test',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty22',
                passwordSalt: 'salt'
            });
            let userApp = new UserApp(userInfra);
            let updatedUser: any = await userApp.updateUser(1, {
                email: 'test@test.test',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty22',
                oldPassword: 'azerty'
            });
            expect(updatedUser.userId).equal(1);
            expect(updatedUser.email).equal('test@test.test');
        });
        it('should not allow updateUser if email is invalid', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            sandbox.stub(userInfra, 'findUserByEmail').resolves({
                userId: 2,
                firstName: 'fName1',
                lastName: 'lName1',
                age: 12,
                email: 'email@already.used',
                password: sha256('azerty' + sha256('1234AZER')),
                passwordSalt: '1234AZER'
            });
            let userApp = new UserApp(userInfra);
            let dataToUpdate = {
                email: 'email@already.used',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty',
                oldPassword: 'azerty'
            };
            try {
                await userApp.updateUser(1, dataToUpdate);
                assert.fail('factory should throw an error if email already used');
            } catch (error) {
                expect(error.message).equal('email_already_used');
            }
        });
        it('should not allow updateUser if data is not found', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(null);
            let userApp = new UserApp(userInfra);

            let dataToUpdate = {
                email: 'not@used.email',
                firstName: 'test',
                lastName: 'test',
                age: 12,
                password: 'azerty',
                oldPassword: 'ytreza'
            };
            try {
                await userApp.updateUser(2, dataToUpdate);
                assert.fail('factory should throw an error if data is not found');
            } catch (error) {
                expect(error.message).equal('data_not_found');
            }
        });
        it('should not allow updateUser if age is invalid', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
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
        it('should updateUser even if no password provided', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            sandbox.stub(userInfra, 'updateUser').resolves({
                userId: 1,
                firstName: 'test',
                lastName: 'test',
                age: 12,
                email: 'valid1@user.com',
                password: sha256('azerty' + sha256('1234AZER')),
                passwordSalt: '1234AZER'
            });
            let userApp = new UserApp(userInfra);
            let dataToUpdate = {
                firstName: 'test',
                lastName: 'test'
            };
            let updatedUser: any = await userApp.updateUser(1, dataToUpdate);
            expect(updatedUser.userId).equal(1);
            expect(updatedUser.firstName).equal('test');
            expect(updatedUser.lastName).equal('test');
            expect(updatedUser.age).equal(12);
        });
        it('should not allow updateUser if old password is invalid', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
            let dataToUpdate = {
                firstName: 'test',
                lastName: 'test',
                age: 22,
                password: 'azerty',
                oldPassword: 'invalid'
            };
            try {
                await userApp.updateUser(1, dataToUpdate);
                assert.fail('factory should throw an error if old password is invalid');
            } catch (error) {
                expect(error.message).equal('invalid_old_password');
            }
        });
        it('should not allow updateUser if password is there but old password is not', async () => {
            sandbox.stub(userInfra, 'findUserById').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
            let dataToUpdate = {
                firstName: 'test',
                lastName: 'test',
                age: 22,
                password: 'azerty'
            };
            try {
                await userApp.updateUser(1, dataToUpdate);
                assert.fail('factory should throw an error if password is there but old password is not');
            } catch (error) {
                expect(error.message).equal('missing_parameters');
            }
        });
    });
    describe('findUserByEmail', function() {
        it('should return the user if the email exist', async () => {
            sandbox.stub(userInfra, 'findUserByEmail').resolves(defaultUser);
            let userApp = new UserApp(userInfra);
            let user = await userApp.findUserByEmail('valid1@user.com');
            expect(user.email).to.equal('valid1@user.com');
            expect(user.userId).to.equal(1);
        });

        it('should return no user if users do not exist', async () => {
            sandbox.stub(userInfra, 'findUserByEmail').resolves(null);
            let userApp = new UserApp(userInfra);
            try {
                await userApp.findUserByEmail('email@not.used');
                assert.fail('no exception thrown');
            } catch (e) {
                expect(e.message).to.equal('data_not_found');
            }
        });
    });
});

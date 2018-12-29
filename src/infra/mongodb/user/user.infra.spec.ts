import { expect, assert } from 'chai';
import 'mocha';
import { UserInfra } from './user.infra';
import { modelMock } from './user.model.mock';
import { model } from 'mongoose';
let userInfra = new UserInfra();
userInfra.init(modelMock);
describe('User Infra Mongodb', () => {
    describe('findUserById', () => {
        it('should return data if it exist', async () => {
            let user = await userInfra.findUserById(1);
            expect(user.userId).equal(1);
        });
        it('should return null if data does not exist', async () => {
            let user = await userInfra.findUserById(2);
            expect(user).equal(null);
        });
    });
    describe('findAllUsers', () => {
        it('should return an array of users', async () => {
            let users = await userInfra.findAllUsers();
            expect(users.length).equal(1);
            expect(users[0].userId).equal(1);
        });
    });
    it('should delete user anyway', async () => {
        await userInfra.deleteUserById(1);
    });
    it('should return the user found for a given email', async () => {
        let user = await userInfra.findUserByEmail('email@user.com');
        expect(user.userId).equal(1);
    });

    it('should update user with given data', async () => {
        let user = await userInfra.updateUser(1, { email: 'email@user.com' });
        expect(user.email).equal('email@user.com');
    });

    it('should create user with an unique user Id', async () => {
        let user = await userInfra.createUser({
            email: 'email@test.com',
            age: 12,
            firstName: 'test',
            lastName: 'test'
        });
        expect(user.userId).equal(2);
    });
    it('should create user with id 1 if no user exist', async () => {
        modelMock.shouldReturnUserFindOne = false;
        let user = await userInfra.createUser({
            email: 'email@test.com',
            age: 12,
            firstName: 'test',
            lastName: 'test'
        });
        expect(user.userId).equal(1);
    });
});

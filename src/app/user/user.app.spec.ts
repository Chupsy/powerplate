import { expect } from 'chai';
import 'mocha';
import 'reflect-metadata';
import UserApp from './user.app';

describe('User App', () => {
    it('should allow findUserById', () => {
        const userApp = new UserApp();
        expect(userApp.findUserById(1)).to.exist;
    });
    it('should allow findAllUsers', () => {
        const userApp = new UserApp();
        expect(userApp.findAllUsers()).to.exist;
    });
    it('should allow deleteUser', () => {
        const userApp = new UserApp();
        userApp.deleteUserById(1);
        expect(userApp.deleteUserById).to.exist;
    });
    it('should allow createUser', () => {
        const userApp = new UserApp();
        userApp.createUser({
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(userApp.createUser).to.exist;
    });
    it('should allow updateUser', () => {
        const userApp = new UserApp();
        userApp.updateUser(1, {
            email: 'test@test.test',
            firstName: 'test',
            lastName: 'test',
            age: 12
        });
        expect(userApp.updateUser).to.exist;
    });
});

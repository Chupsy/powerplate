import { expect } from 'chai';
import 'mocha';
import 'reflect-metadata';
import UserApp from './user.app';

describe('response_normalizer', () => {
    it('should accept valid code', () => {
        const userApp = new UserApp();
        expect(userApp.findUserById(1)).to.exist;
    });
});

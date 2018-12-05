import { userUpdateSchema } from './update.schema';
import { validate } from 'joi';
import { expect } from 'chai';
import 'mocha';

describe('userUpdateSchema', () => {
    it('should accept valid user', () => {
        const result = validate(
            {
                params: {
                    userId: 1
                },
                body: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            },
            userUpdateSchema
        );
        expect(result.error).to.be.null;
    });

    it('should refuse invalid email', () => {
        const result = validate(
            {
                params: {
                    userId: 1
                },
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'invalidEmail',
                    age: 30
                }
            },
            userUpdateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('string.email');
    });

    it('should refuse invalid age', () => {
        const result = validate(
            {
                params: {
                    userId: 1
                },
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'valid@email.com',
                    age: -2
                }
            },
            userUpdateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('number.min');
    });

    it('should refuse missing parameters', () => {
        const result = validate(
            {
                params: {
                    userId: 1
                },
                body: {}
            },
            userUpdateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('object.missing');
    });
    it('should refuse missing userId', () => {
        const result = validate(
            {
                params: {},
                body: {
                    email: 'test@test.test'
                }
            },
            userUpdateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('any.required');
    });
});

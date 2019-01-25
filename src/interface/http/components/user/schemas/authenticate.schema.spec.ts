import { validate } from 'joi';
import { expect } from 'chai';
import 'mocha';
import { userAuthenticateSchema } from './authenticate.schema';

describe('userAuthenticateSchema', () => {
    it('should accept valid authenticate', () => {
        const result = validate(
            {
                body: {
                    authData: { email: 'john@doe.com', password: 'azerty' },
                    strategy: 'LOCAL'
                }
            },
            userAuthenticateSchema
        );
        expect(result.error).to.be.null;
    });

    it('should refuse invalid email', () => {
        const result = validate(
            {
                body: {
                    authData: { email: 'invalidEmail', password: 'azerty' },
                    strategy: 'LOCAL'
                }
            },
            userAuthenticateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('string.email');
    });

    it('should refuse missing parameters', () => {
        const result = validate(
            {
                body: {
                    password: 'azerty'
                }
            },
            userAuthenticateSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('any.required');
    });

    it('should accept bearer token', () => {
        const result = validate(
            {
                body: {
                    authData: { bearerToken: 'john@doe.com' },
                    strategy: 'LOCAL'
                }
            },
            userAuthenticateSchema
        );
        expect(result.error).to.be.null;
    });
});

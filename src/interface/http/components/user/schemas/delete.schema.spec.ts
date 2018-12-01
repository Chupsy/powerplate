import { userDeleteSchema } from './delete.schema';
import { validate } from 'joi';
import { expect } from 'chai';
import 'mocha';

describe('userDeleteSchema', () => {
    it('should accept valid userId', () => {
        const result = validate(
            {
                params: {
                    userId: 30
                }
            },
            userDeleteSchema
        );
        expect(result.error).to.be.null;
    });

    it('should refuse missing parameters', () => {
        const result = validate(
            {
                params: {}
            },
            userDeleteSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('any.required');
    });
});

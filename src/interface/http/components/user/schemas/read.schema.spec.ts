import { userFindOneSchema } from './read.schema';
import { validate } from 'joi';
import { expect } from 'chai';
import 'mocha';

describe('userFindOneSchema', () => {
    it('should accept valid userId', () => {
        const result = validate(
            {
                params: {
                    userId: 30
                }
            },
            userFindOneSchema
        );
        expect(result.error).to.be.null;
    });

    it('should refuse missing parameters', () => {
        const result = validate(
            {
                params: {}
            },
            userFindOneSchema
        );
        expect(result.error).to.be.an('error');
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].type).to.equal('any.required');
    });
});

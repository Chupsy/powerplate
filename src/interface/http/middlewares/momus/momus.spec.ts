import errorExposer from './index';
import { assert, expect } from 'chai';
import 'mocha';
import { ApiResponse, responseList } from '../../constants/response';
import responseNormalizer from '../../helpers/response_normalizer';
import momus from './index';
import { Joi } from 'celebrate';
import { object, number, validate } from 'joi';

let resMock: any;
beforeEach(() => {
    resMock = {
        cb: null,
        statusNumber: null,
        registerCallback: function(cb: any) {
            resMock.cb = cb;
        },
        status: function(status: number) {
            resMock.statusNumber = status;
            return resMock;
        },
        json: function(data: any) {
            if (resMock.cb) {
                resMock.cb(data, resMock.statusNumber);
            }
        }
    };
});
describe('momus', () => {
    it('should call response normalizer with error message', done => {
        const expectedResponse: ApiResponse = responseList.get('data_not_found');
        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data).be.undefined;
            done();
        });
        momus(new Error('data_not_found'), null, resMock, null);
    });
    it('should call response normalizer with joi errors if its a joi error', done => {
        const expectedResponse: ApiResponse = responseList.get('invalid_parameters');
        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).not.to.equal(expectedResponse.message);
            expect(response.data).be.undefined;
            done();
        });
        const result = validate(
            {},
            {
                body: object()
                    .keys({
                        invalidForTest: number().required()
                    })
                    .required()
            }
        );
        momus(result.error, null, resMock, null);
    });
    it('should call bypass if its not a joi error', done => {
        const expectedResponse: ApiResponse = responseList.get('internal_server_error');
        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data).be.undefined;
            done();
        });
        const result = validate(
            {},
            {
                body: object()
                    .keys({
                        invalidForTest: number().required()
                    })
                    .required()
            }
        );
        result.error.isJoi = false;
        momus(result.error, null, resMock, null);
    });
});

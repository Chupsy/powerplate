import errorExposer from './index';
import { assert, expect } from 'chai';
import 'mocha';
import { ApiResponse, responseList, ResponseCodes } from '../../constants/response';
import momus from './index';
import { object, number, validate } from 'joi';
import httpResmock from './../../helpers/response_normalizer/http_res.mock';

let resMock: any;
beforeEach(() => {
    resMock = httpResmock();
});
describe('momus', () => {
    it('should call response normalizer with error message', done => {
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.DATA_NOT_FOUND);
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
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.INVALID_PARAMETERS);
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
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.INTERNAL_SERVER_ERROR);
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

import responseNormalizer from './index';
import { expect } from 'chai';
import 'mocha';
import { ApiResponse, responseList, ResponseCodes } from '../../constants/response';
import httpResmock from './http_res.mock';
let resMock: any;
beforeEach(() => {
    resMock = httpResmock();
});

describe('response_normalizer', () => {
    it('should accept valid code', done => {
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_CREATED);

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data.test).equal(1);
            done();
        });
        responseNormalizer(resMock, ResponseCodes.USER_CREATED, { test: 1 });
    });
    it('should send response even without data', done => {
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_CREATED);

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data).to.be.undefined;
            done();
        });
        responseNormalizer(resMock, ResponseCodes.USER_CREATED);
    });
    it('should send internal server error if status code doesnt exist', done => {
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.INTERNAL_SERVER_ERROR);

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data).to.be.undefined;
            done();
        });
        responseNormalizer(resMock, 'invalid code');
    });
    it('should be able to override message', done => {
        const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_CREATED);

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal('overriden message');
            expect(response.data).to.be.undefined;
            done();
        });
        responseNormalizer(resMock, ResponseCodes.USER_CREATED, undefined, 'overriden message');
    });
});

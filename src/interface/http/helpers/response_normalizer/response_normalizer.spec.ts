import responseNormalizer from './index';
import { expect } from 'chai';
import 'mocha';
import { ApiResponse, responseList } from '../../constants/response';
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

describe('response_normalizer', () => {
    it('should accept valid code', done => {
        const expectedResponse: ApiResponse = responseList.get('user_created');

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data.test).equal(1);
            done();
        });
        responseNormalizer(resMock, 'user_created', { test: 1 });
    });
    it('should send response even without data', done => {
        const expectedResponse: ApiResponse = responseList.get('user_created');

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal(expectedResponse.message);
            expect(response.data).to.be.undefined;
            done();
        });
        responseNormalizer(resMock, 'user_created');
    });
    it('should send internal server error if status code doesnt exist', done => {
        const expectedResponse: ApiResponse = responseList.get('internal_server_error');

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
        const expectedResponse: ApiResponse = responseList.get('user_created');

        resMock.registerCallback((response: any, statusNumber: number) => {
            expect(statusNumber).equal(expectedResponse.status);
            expect(response.status).equal(expectedResponse.status);
            expect(response.code).equal(expectedResponse.code);
            expect(response.message).equal('overriden message');
            expect(response.data).to.be.undefined;
            done();
        });
        responseNormalizer(resMock, 'user_created', undefined, 'overriden message');
    });
});

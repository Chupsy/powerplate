import { expect } from 'chai';
import { Container } from 'inversify';
import 'reflect-metadata';
import { UserController } from './user.controller';
import HTTP_INTERFACE_IDENTIFIERS from './../../identifiers';
import 'mocha';
import APP_IDENTIFIERS from '../../../../app/identifiers';
import UserAppMock from '../../../../app/user/user.app.mock';
import UserApp from '../../../../app/user/user.app';
import { cleanUpMetadata } from 'inversify-express-utils';
import { ApiResponse, responseList, ResponseCodes } from '../../constants/response';
import httpResmock from './../../helpers/response_normalizer/http_res.mock';

let userController: any;
let resMock: any;

beforeEach(() => {
    cleanUpMetadata();
});
beforeEach(() => {
    const container = new Container();
    container.bind<UserApp>(APP_IDENTIFIERS.UserApp).to(UserAppMock);
    container
        .bind<UserController>(HTTP_INTERFACE_IDENTIFIERS.UserController)
        .to(UserController)
        .inSingletonScope();
    userController = container.get<UserController>(HTTP_INTERFACE_IDENTIFIERS.UserController);
});

beforeEach(() => {
    resMock = httpResmock();
});

describe('userController', () => {
    describe('GET /users/:userId', () => {
        it('should return user that was found', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_FOUND);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.userId).equal(1);
            });
            await userController.getUser(1, resMock);
        });
    });
    describe('GET /users/', () => {
        it('should return users that was found', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USERS_FOUND);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.length).equal(2);
                expect(apiResponse.data[0].userId).equal(1);
                expect(apiResponse.data[1].userId).equal(2);
            });
            await userController.getUsers(resMock);
        });
    });

    describe('DELETE /users/:userId', () => {
        it('should deleteUser', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_DELETED);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data).to.be.undefined;
            });
            await userController.deleteUser(1, resMock);
        });
    });
    describe('POST /users', () => {
        it('should createUser', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_CREATED);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.email).equal('test@test.com');
                expect(apiResponse.data.userId).equal(1);
            });
            await userController.createUser(
                {
                    body: {
                        email: 'test@test.com',
                        firstName: 'testFirstName',
                        lastName: 'testLastName',
                        age: 12,
                        password: 'azerty'
                    }
                },
                resMock
            );
        });
    });

    describe('PUT /users/:userId', () => {
        it('should updateUser', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_UPDATED);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.email).equal('test@test.com');
                expect(apiResponse.data.userId).equal(1);
            });
            await userController.updateUser(
                1,
                {
                    body: {
                        email: 'test@test.com',
                        firstName: 'testFirstName',
                        lastName: 'testLastName',
                        age: 12,
                        password: 'azerty',
                        oldPassword: 'ytreza'
                    }
                },
                resMock
            );
        });
    });

    describe('POST /users/authenticate', () => {
        it('should authenticate with password properly', async () => {
            const expectedResponse: ApiResponse = responseList.get(ResponseCodes.USER_AUTHENTICATED);
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.email).equal('test@test.com');
                expect(apiResponse.data.userId).equal(1);
            });
            await userController.authenticateUser(
                {
                    body: {
                        authData: {
                            email: 'test@test.com',
                            password: 'azerty'
                        },
                        strategy: 'LOCAL'
                    }
                },
                resMock
            );
        });
    });
});

import { expect } from 'chai';
import 'reflect-metadata';
import { UserController } from './user.controller';
import 'mocha';
import UserApp from '../../../../app/user/user.app';
import { cleanUpMetadata } from 'inversify-express-utils';
import { ApiResponse, responseList, ResponseCodes } from '../../constants/response';
import httpResmock from './../../helpers/response_normalizer/http_res.mock';
import { AuthenticateApp } from '../../../../app/authenticate/authenticate.app';
import * as sinon from 'sinon';

let userController: any;
let resMock: any;
const sandbox = sinon.createSandbox();

beforeEach(() => {
    cleanUpMetadata();
    resMock = httpResmock();
});

afterEach(() => {
    sandbox.restore();
});

describe('userController', () => {
    describe('GET /users/:userId', () => {
        it('should return user that was found', async () => {
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            sandbox
                .stub(userApp, 'findUserById')
                .withArgs(1)
                .resolves({
                    userId: 1,
                    firstName: 'test',
                    lastName: 'test',
                    age: 12
                });
            userController = new UserController(userApp, authenticateApp);
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
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            sandbox.stub(userApp, 'findAllUsers').resolves([
                {
                    userId: 1,
                    firstName: 'test',
                    lastName: 'test',
                    age: 12
                },
                {
                    userId: 2,
                    firstName: 'test2',
                    lastName: 'test2',
                    age: 13
                }
            ]);
            userController = new UserController(userApp, authenticateApp);
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
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            let stub = sandbox.stub(userApp, 'deleteUserById');
            stub.withArgs(1).resolves();
            userController = new UserController(userApp, authenticateApp);
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
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            let stub = sandbox.stub(userApp, 'createUser');
            stub.withArgs({
                email: 'test@test.com',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                age: 12,
                password: 'azerty'
            }).resolves({
                userId: 1,
                email: 'test@test.com',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                age: 12
            });
            userController = new UserController(userApp, authenticateApp);
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
                } as any,
                resMock
            );
        });
    });

    describe('PUT /users/:userId', () => {
        it('should updateUser', async () => {
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            let stub = sandbox.stub(userApp, 'updateUser');
            stub.withArgs(1, {
                email: 'test@test.com',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                age: 12,
                password: 'azerty',
                oldPassword: 'ytreza'
            }).resolves({
                userId: 1,
                email: 'test@test.com',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                age: 12
            });
            userController = new UserController(userApp, authenticateApp);
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
                } as any,
                resMock
            );
        });
    });

    describe('POST /users/authenticate', () => {
        it('should authenticate with password properly', async () => {
            let userApp = new UserApp(null);
            let authenticateApp = new AuthenticateApp(null, null, null);
            let stub = sandbox.stub(authenticateApp, 'authenticateByStrategy');
            stub.resolves({
                userId: 1,
                email: 'test@test.com',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                age: 12
            });
            userController = new UserController(userApp, authenticateApp);
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
                } as any,
                resMock
            );
        });
    });
});

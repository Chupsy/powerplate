import { assert, expect } from 'chai';
import { ContainerModule, interfaces, Container } from 'inversify';
import 'reflect-metadata';
import { UserController } from './user.controller';
import HTTP_INTERFACE_IDENTIFIERS from './../../identifiers';
import 'mocha';
import APP_IDENTIFIERS from '../../../../app/identifiers';
import UserAppMock from '../../../../app/user/user.app.mock';
import UserApp from '../../../../app/user/user.app';
import { cleanUpMetadata } from 'inversify-express-utils';
import { ApiResponse, responseList } from '../../constants/response';

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

describe('userController', () => {
    describe('GET /users/:userId', () => {
        it('should return user that was found', async done => {
            const expectedResponse: ApiResponse = responseList.get('user_found');
            resMock.registerCallback((apiResponse: any, statusNumber: number) => {
                expect(statusNumber).equal(expectedResponse.status);
                expect(apiResponse.status).equal(expectedResponse.status);
                expect(apiResponse.code).equal(expectedResponse.code);
                expect(apiResponse.message).equal(expectedResponse.message);
                expect(apiResponse.data.userId).equal(1);
                done();
            });
            userController.getUser(1, resMock);
        });
    });
});

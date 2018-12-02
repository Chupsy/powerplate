import {
    interfaces,
    httpGet,
    controller,
    requestParam,
    response,
    httpDelete,
    httpPost,
    request,
    httpPut
} from 'inversify-express-utils';
import { inject } from 'inversify';
import APP_IDENTIFIERS from '../../../../app/identifiers';
import { celebrate, errors } from 'celebrate';
import express = require('express');
import { userFindOneSchema } from './schemas/read.schema';
import responseNormalizer from '../../helpers/response_normalizer';
import UserApp from '../../../../app/user/user.app';
import { ResponseCodes } from '../../constants/response';
import { userCreateSchema } from './schemas/create.schema';
import { userUpdateSchema } from './schemas/update.schema';

@controller('/users')
export class UserController implements interfaces.Controller {
    constructor(@inject(APP_IDENTIFIERS.UserApp) private userApp: UserApp) {}

    /**
     * @api {get} /user/:userId Find user by id
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} userId User id.
     *
     * @apiSuccess {String} code            request status code.
     * @apiSuccess {Number} status          request status.
     * @apiSuccess {String} message         request message.
     * @apiSuccess {Object} data            request data.
     * @apiSuccess {Number} data.userId     User unique Id.
     * @apiSuccess {String} data.firstName  User first name.
     * @apiSuccess {String} data.lastName   User last name.
     * @apiSuccess {Number} data.age        User age.
     * @apiSuccess {String} data.email      User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *   {
     *       "code": "user_found",
     *       "status": 200,
     *       "message": "You have access to this user.",
     *       "data": {
     *           "userId": 1,
     *           "firstName": "John",
     *           "lastName": "Doe",
     *           "age": 20,
     *           "email": "john@doe.com",
     *       }
     *   }
     *
     * @apiError data_not_found Data was not found.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "data_not_found",
     *       "status": 404,
     *       "message": "Data was not found."
     *   }
     *
     * @apiError invalid_parameters Invalid parameters.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_parameters",
     *       "status": 400,
     *       "message": "\"userId\" must be a number"
     *   }
     */
    @httpGet('/:userId', celebrate(userFindOneSchema))
    public getUser(@requestParam('userId') id: number, @response() res: express.Response): void {
        const user = this.userApp.findUserById(id);
        responseNormalizer(res, ResponseCodes.USER_FOUND, user);
    }

    /**
     * @api {get} /user Find all users
     * @apiName GetUsers
     * @apiGroup User
     *
     * @apiSuccess {String} code            request status code.
     * @apiSuccess {Number} status          request status.
     * @apiSuccess {String} message         request message.
     * @apiSuccess {Object[]} data            request data.
     * @apiSuccess {Number} data.userId     User unique Id.
     * @apiSuccess {String} data.firstName  User first name.
     * @apiSuccess {String} data.lastName   User last name.
     * @apiSuccess {Number} data.age        User age.
     * @apiSuccess {String} data.email      User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *   {
     *       "code": "users_found",
     *       "status": 200,
     *       "message": "You have access to these users.",
     *       "data": [{
     *           "userId": 1,
     *           "firstName": "John",
     *           "lastName": "Doe",
     *           "age": 20,
     *           "email": "john@doe.com",
     *       }]
     *   }
     *
     */
    @httpGet('/')
    public getUsers(@response() res: express.Response): void {
        const users = this.userApp.findAllUsers();
        responseNormalizer(res, ResponseCodes.USERS_FOUND, users);
    }

    /**
     * @api {delete} /user/:userId Delete user by id
     * @apiName DeleteUser
     * @apiGroup User
     *
     * @apiParam {Number} userId Userid.
     *
     * @apiSuccess {String} code            request status code.
     * @apiSuccess {Number} status          request status.
     * @apiSuccess {String} message         request message.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *   {
     *       "code": "user_deleted",
     *       "status": 200,
     *       "message": "User was successfully deleted."
     *   }
     *
     * @apiError data_not_found Data was not found.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "data_not_found",
     *       "status": 404,
     *       "message": "Data was not found."
     *   }
     *
     *
     * @apiError invalid_parameters Invalid parameters.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_parameters",
     *       "status": 400,
     *       "message": "\"userId\" must be a number"
     *   }
     */
    @httpDelete('/:userId')
    public deleteUser(@requestParam('userId') id: number, @response() res: express.Response): void {
        this.userApp.deleteUserById(id);
        responseNormalizer(res, ResponseCodes.USER_DELETED);
    }

    /**
     * @api {post} /user Create user
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam {String} email     User email.
     * @apiParam {String} firstName User firstName.
     * @apiParam {String} lastName  User lastName.
     * @apiParam {Number} age       User age.
     *
     * @apiSuccess {String} code            request status code.
     * @apiSuccess {Number} status          request status.
     * @apiSuccess {String} message         request message.
     * @apiSuccess {Object} data            request data.
     * @apiSuccess {Number} data.userId     User unique Id.
     * @apiSuccess {String} data.firstName  User first name.
     * @apiSuccess {String} data.lastName   User last name.
     * @apiSuccess {Number} data.age        User age.
     * @apiSuccess {String} data.email      User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *   {
     *       "code": "user_created",
     *       "status": 201,
     *       "message": "User was successfully created.",
     *       "data": {
     *           "userId": 1,
     *           "firstName": "John",
     *           "lastName": "Doe",
     *           "age": 20,
     *           "email": "john@doe.com",
     *       }
     *   }
     *
     *
     * @apiError invalid_parameters Invalid parameters.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_parameters",
     *       "status": 400,
     *       "message": "\"userId\" must be a number"
     *   }
     *
     * @apiError email_already_used Email already used.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "email_already_used",
     *       "status": 400,
     *       "message": "Email already in use."
     *   }
     */
    @httpPost('/', celebrate(userCreateSchema))
    public createUser(@request() req: express.Request, @response() res: express.Response): void {
        const user = this.userApp.createUser(req.body);
        responseNormalizer(res, ResponseCodes.USER_CREATED, user);
    }

    /**
     * @api {put} /user/:userId Update user
     * @apiName UpdateUser
     * @apiGroup User
     *
     * @apiParam {number} userId    User Id.
     * @apiParam {String} [email]     User email.
     * @apiParam {String} [firstName] User firstName.
     * @apiParam {String} [lastName]  User lastName.
     * @apiParam {Number} [age]       User age.
     *
     * @apiSuccess {String} code            request status code.
     * @apiSuccess {Number} status          request status.
     * @apiSuccess {String} message         request message.
     * @apiSuccess {Object} data            request data.
     * @apiSuccess {Number} data.userId     User unique Id.
     * @apiSuccess {String} data.firstName  User first name.
     * @apiSuccess {String} data.lastName   User last name.
     * @apiSuccess {Number} data.age        User age.
     * @apiSuccess {String} data.email      User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *   {
     *       "code": "user_updated",
     *       "status": 200,
     *       "message": "User was successfully updated.",
     *       "data": {
     *           "userId": 1,
     *           "firstName": "John",
     *           "lastName": "Doe",
     *           "age": 20,
     *           "email": "john@doe.com",
     *       }
     *   }
     *
     * @apiError data_not_found Data was not found.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "data_not_found",
     *       "status": 404,
     *       "message": "Data was not found."
     *   }
     *
     * @apiError invalid_parameters Invalid parameters.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_parameters",
     *       "status": 400
     *       "message": "\"userId\" must be a number"
     *   }
     *
     * @apiError email_already_used Email already used.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "email_already_used",
     *       "status": 400,
     *       "message": "Email already in use."
     *   }
     */
    @httpPut('/:userId', celebrate(userUpdateSchema))
    public updateUser(
        @requestParam('userId') id: number,
        @request() req: express.Request,
        @response() res: express.Response
    ): void {
        const user = this.userApp.updateUser(id, req.body);
        responseNormalizer(res, ResponseCodes.USER_UPDATED, user);
    }
}

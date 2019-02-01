"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const identifiers_1 = require("../../../../app/identifiers");
const celebrate_1 = require("celebrate");
const express = require("express");
const read_schema_1 = require("./schemas/read.schema");
const response_normalizer_1 = require("../../helpers/response_normalizer");
const user_app_1 = require("../../../../app/user/user.app");
const response_1 = require("../../constants/response");
const create_schema_1 = require("./schemas/create.schema");
const update_schema_1 = require("./schemas/update.schema");
const delete_schema_1 = require("./schemas/delete.schema");
const authenticate_schema_1 = require("./schemas/authenticate.schema");
let UserController = class UserController {
    constructor(userApp) {
        this.userApp = userApp;
    }
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
     *     HTTP/2 200 OK
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
    async getUser(id, res) {
        const user = await this.userApp.findUserById(id);
        response_normalizer_1.default(res, response_1.ResponseCodes.USER_FOUND, user);
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
     *     HTTP/2 200 OK
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
    async getUsers(res) {
        const users = await this.userApp.findAllUsers();
        response_normalizer_1.default(res, response_1.ResponseCodes.USERS_FOUND, users);
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
     *     HTTP/2 200 OK
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
    async deleteUser(id, res) {
        await this.userApp.deleteUserById(id);
        response_normalizer_1.default(res, response_1.ResponseCodes.USER_DELETED);
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
     * @apiParam {String} password  User password.
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
     *     HTTP/2 200 OK
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
    async createUser(req, res) {
        const user = await this.userApp.createUser(req.body);
        response_normalizer_1.default(res, response_1.ResponseCodes.USER_CREATED, user);
    }
    /**
     * @api {put} /user/:userId Update user
     * @apiName UpdateUser
     * @apiGroup User
     *
     * @apiParam {number} userId        User Id.
     * @apiParam {String} [email]       User email.
     * @apiParam {String} [firstName]   User firstName.
     * @apiParam {String} [lastName]    User lastName.
     * @apiParam {Number} [age]         User age.
     * @apiParam {String} [password]    User new password.
     * @apiParam {String} [oldPassword] User old password.
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
     *     HTTP/2 200 OK
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
     *
     * @apiError invalid_old_password Invalid old password.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_old_password",
     *       "status": 400,
     *       "message": "Invalid old password."
     *   }
     */
    async updateUser(id, req, res) {
        const user = await this.userApp.updateUser(id, req.body);
        response_normalizer_1.default(res, response_1.ResponseCodes.USER_UPDATED, user);
    }
    /**
     * @api {post} /user/authenticate Authenticate user
     * @apiName AuthenticateUser
     * @apiGroup User
     *
     * @apiParam {String} strategy              Auth strategy (LOCAL | BEARER_TOKEN).
     * @apiParam {Object} authData              Auth data.
     * @apiParam {String} authData.email        User email.
     * @apiParam {String} authData.password     User password.
     * @apiParam {String} authData.bearerToken  User bearer token.
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
     *     HTTP/2 200 OK
     *   {
     *       "code": "user_authenticated",
     *       "status": 201,
     *       "message": "User authenticated.",
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
     *
     * @apiError invalid_password Invalid password.
     *
     * @apiErrorExample Error-Response:
     *   {
     *       "code": "invalid_password",
     *       "status": 400,
     *       "message": "Invalid password."
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
     */
    async authenticateUser(req, res) {
        const user = await this.userApp.authenticateUser({ email: req.body.authData.email, password: req.body.authData.password }, req.body.strategy);
        response_normalizer_1.default(res, response_1.ResponseCodes.USER_AUTHENTICATED, user);
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/:userId', celebrate_1.celebrate(read_schema_1.userFindOneSchema)),
    __param(0, inversify_express_utils_1.requestParam('userId')), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(0, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:userId', celebrate_1.celebrate(delete_schema_1.userDeleteSchema)),
    __param(0, inversify_express_utils_1.requestParam('userId')), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    inversify_express_utils_1.httpPost('/', celebrate_1.celebrate(create_schema_1.userCreateSchema)),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    inversify_express_utils_1.httpPut('/:userId', celebrate_1.celebrate(update_schema_1.userUpdateSchema)),
    __param(0, inversify_express_utils_1.requestParam('userId')),
    __param(1, inversify_express_utils_1.request()),
    __param(2, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    inversify_express_utils_1.httpPost('/authenticate', celebrate_1.celebrate(authenticate_schema_1.userAuthenticateSchema)),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "authenticateUser", null);
UserController = __decorate([
    inversify_express_utils_1.controller('/users'),
    __param(0, inversify_1.inject(identifiers_1.default.UserApp)),
    __metadata("design:paramtypes", [user_app_1.default])
], UserController);
exports.UserController = UserController;

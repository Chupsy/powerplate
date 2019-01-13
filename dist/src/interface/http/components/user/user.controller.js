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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var identifiers_1 = require("../../../../app/identifiers");
var celebrate_1 = require("celebrate");
var express = require("express");
var read_schema_1 = require("./schemas/read.schema");
var response_normalizer_1 = require("../../helpers/response_normalizer");
var user_app_1 = require("../../../../app/user/user.app");
var response_1 = require("../../constants/response");
var create_schema_1 = require("./schemas/create.schema");
var update_schema_1 = require("./schemas/update.schema");
var delete_schema_1 = require("./schemas/delete.schema");
var UserController = /** @class */ (function () {
    function UserController(userApp) {
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
    UserController.prototype.getUser = function (id, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.findUserById(id)];
                    case 1:
                        user = _a.sent();
                        response_normalizer_1.default(res, response_1.ResponseCodes.USER_FOUND, user);
                        return [2 /*return*/];
                }
            });
        });
    };
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
    UserController.prototype.getUsers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.findAllUsers()];
                    case 1:
                        users = _a.sent();
                        response_normalizer_1.default(res, response_1.ResponseCodes.USERS_FOUND, users);
                        return [2 /*return*/];
                }
            });
        });
    };
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
    UserController.prototype.deleteUser = function (id, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.deleteUserById(id)];
                    case 1:
                        _a.sent();
                        response_normalizer_1.default(res, response_1.ResponseCodes.USER_DELETED);
                        return [2 /*return*/];
                }
            });
        });
    };
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
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.createUser(req.body)];
                    case 1:
                        user = _a.sent();
                        response_normalizer_1.default(res, response_1.ResponseCodes.USER_CREATED, user);
                        return [2 /*return*/];
                }
            });
        });
    };
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
     */
    UserController.prototype.updateUser = function (id, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.updateUser(id, req.body)];
                    case 1:
                        user = _a.sent();
                        response_normalizer_1.default(res, response_1.ResponseCodes.USER_UPDATED, user);
                        return [2 /*return*/];
                }
            });
        });
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
    UserController = __decorate([
        inversify_express_utils_1.controller('/users'),
        __param(0, inversify_1.inject(identifiers_1.default.UserApp)),
        __metadata("design:paramtypes", [user_app_1.default])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

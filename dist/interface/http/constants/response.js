"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes["USER_FOUND"] = "user_found";
    ResponseCodes["USERS_FOUND"] = "users_found";
    ResponseCodes["USER_UPDATED"] = "user_updated";
    ResponseCodes["USER_DELETED"] = "user_deleted";
    ResponseCodes["USER_CREATED"] = "user_created";
    ResponseCodes["DATA_NOT_FOUND"] = "data_not_found";
    ResponseCodes["EMAIL_ALREADY_USED"] = "email_already_used";
    ResponseCodes["INVALID_PARAMETERS"] = "invalid_parameters";
    ResponseCodes["INTERNAL_SERVER_ERROR"] = "internal_server_error";
})(ResponseCodes = exports.ResponseCodes || (exports.ResponseCodes = {}));
exports.responseList = new Map([
    [
        ResponseCodes.USER_FOUND,
        {
            code: 'user_found',
            status: 200,
            message: 'You have access to this user.'
        }
    ],
    [
        ResponseCodes.USERS_FOUND,
        {
            code: 'users_found',
            status: 200,
            message: 'You have access to these users.'
        }
    ],
    [
        ResponseCodes.USER_UPDATED,
        {
            code: 'user_updated',
            status: 200,
            message: 'User was successfully updated.'
        }
    ],
    [
        ResponseCodes.USER_DELETED,
        {
            code: 'user_deleted',
            status: 200,
            message: 'User was successfully deleted.'
        }
    ],
    [
        ResponseCodes.USER_CREATED,
        {
            code: 'user_created',
            status: 201,
            message: 'User was successfully created.'
        }
    ],
    [
        ResponseCodes.DATA_NOT_FOUND,
        {
            code: 'data_not_found',
            status: 404,
            message: 'Data was not found.'
        }
    ],
    [
        ResponseCodes.EMAIL_ALREADY_USED,
        {
            code: 'email_already_used',
            status: 400,
            message: 'Email already in use.'
        }
    ],
    [
        ResponseCodes.INVALID_PARAMETERS,
        {
            code: 'invalid_parameters',
            status: 400,
            message: 'Missing/invalid parameters.'
        }
    ],
    [
        ResponseCodes.INTERNAL_SERVER_ERROR,
        {
            code: 'internal_server_error',
            status: 500,
            message: 'Internal server error.'
        }
    ]
]);

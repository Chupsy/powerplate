export enum ResponseCodes {
    USER_FOUND = 'user_found',
    USERS_FOUND = 'users_found',
    USER_UPDATED = 'user_updated',
    USER_DELETED = 'user_deleted',
    USER_CREATED = 'user_created',
    DATA_NOT_FOUND = 'data_not_found',
    EMAIL_ALREADY_USED = 'email_already_used',
    INVALID_PARAMETERS = 'invalid_parameters',
    INTERNAL_SERVER_ERROR = 'internal_server_error',
    INVALID_AGE = 'invalid_age',
    INVALID_JSON_INPUT = 'invalid_json_input'
}

export const responseList = new Map<string, ApiResponse>([
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
        ResponseCodes.INVALID_AGE,
        {
            code: 'invalid_age',
            status: 400,
            message: 'Age must be over 0.'
        }
    ],
    [
        ResponseCodes.INTERNAL_SERVER_ERROR,
        {
            code: 'internal_server_error',
            status: 500,
            message: 'Internal server error.'
        }
    ],
    [
        ResponseCodes.INVALID_JSON_INPUT,
        {
            code: 'invalid_json_input',
            status: 400,
            message: 'Invalid JSON input.'
        }
    ]
]);

export type ApiResponse = {
    code: string;
    status: number;
    message: string;
};

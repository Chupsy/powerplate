export const responseList = new Map<string, ApiResponse>([
    [
        'user_found',
        {
            code: 'user_found',
            status: 200,
            message: 'You have access to this user.'
        }
    ],
    [
        'users_found',
        {
            code: 'users_found',
            status: 200,
            message: 'You have access to these users.'
        }
    ],
    [
        'user_updated',
        {
            code: 'user_updated',
            status: 200,
            message: 'User was successfully updated.'
        }
    ],
    [
        'user_deleted',
        {
            code: 'user_deleted',
            status: 200,
            message: 'User was successfully deleted.'
        }
    ],
    [
        'user_created',
        {
            code: 'user_created',
            status: 201,
            message: 'User was successfully created.'
        }
    ],
    [
        'data_not_found',
        {
            code: 'data_not_found',
            status: 404,
            message: 'Data was not found.'
        }
    ],
    [
        'email_already_used',
        {
            code: 'email_already_used',
            status: 400,
            message: 'Email already in use.'
        }
    ],
    [
        'invalid_parameters',
        {
            code: 'invalid_parameters',
            status: 400,
            message: 'Missing/invalid parameters.'
        }
    ],
    [
        'internal_server_error',
        {
            code: 'internal_server_error',
            status: 500,
            message: 'Internal server error.'
        }
    ]
]);

export type ApiResponse = {
    code: string;
    status: number;
    message: string;
};

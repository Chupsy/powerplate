import { ApiResponse, responseList, ResponseCodes } from './../../constants/response';
import * as express from 'express';

export default function responseNormalizer(
    res: express.Response,
    code: string,
    data?: object,
    overrideMessage?: string
) {
    let apiResponse: ApiResponse = responseList.get(code);
    if (!apiResponse) {
        apiResponse = responseList.get(ResponseCodes.INTERNAL_SERVER_ERROR);
    }
    return res.status(apiResponse.status).json({
        status: apiResponse.status,
        code: apiResponse.code,
        message: overrideMessage || apiResponse.message,
        data
    });
}

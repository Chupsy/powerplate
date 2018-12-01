import { ApiResponse, responseList } from './../../constants/response';
export default function responseNormalizer(res: any, code: string, data?: object, overrideMessage?: string) {
    let apiResponse: ApiResponse = responseList.get(code);
    if (!apiResponse) {
        apiResponse = responseList.get('internal_server_error');
    }
    return res.status(apiResponse.status).json({
        status: apiResponse.status,
        code: apiResponse.code,
        message: overrideMessage || apiResponse.message,
        data
    });
}

import responseNormalizer from '../../helpers/response_normalizer';
import { ResponseCodes } from '../../constants/response';
import * as express from 'express';

export default function momus(error: any, req: express.Request, res: express.Response): void {
    let overrideMessage: string;
    if (error.type === 'entity.parse.failed') {
        error.message = ResponseCodes.INVALID_JSON_INPUT;
    }
    if (error.isJoi) {
        overrideMessage = error.details.map((detail: any) => detail.message).join('. ');
        error.message = ResponseCodes.INVALID_PARAMETERS;
    }
    responseNormalizer(res, error.message, undefined, overrideMessage);
}

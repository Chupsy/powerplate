import responseNormalizer from '../../helpers/response_normalizer';
import { ResponseCodes } from '../../constants/response';

export default function momus(error: any, req: any, res: any, next: any): void {
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

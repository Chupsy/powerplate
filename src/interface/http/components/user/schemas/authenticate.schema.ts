import { object, string } from 'joi';
import { AUTHENTICATION_STRATEGY } from '../../../../../app/constants/strategies';

export const userAuthenticateSchema = {
    body: object().keys({
        authData: object()
            .keys({
                email: string().email(),
                password: string(),
                bearerToken: string()
            })
            .xor('email', 'bearerToken')
            .with('email', 'password'),
        strategy: string()
            .valid([AUTHENTICATION_STRATEGY.BEARER_TOKEN, AUTHENTICATION_STRATEGY.LOCAL])
            .required()
    })
};

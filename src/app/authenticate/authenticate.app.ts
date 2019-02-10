import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';
import UserApp from '../user/user.app';
import APP_IDENTIFIERS from '../identifiers';
import User from '../user/user';
import * as moment from 'moment';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as joi from 'joi';
import { UserInfra } from '../../infra/mongodb/user/user.infra';
import { Oauth2TokenInfra } from '../../infra/mongodb/oauth2_token/oauth2_token.infra';

@injectable()
export class AuthenticateApp {
    protected userApp?: UserApp;
    protected oauth2TokenInfra?: Oauth2TokenInfra;
    protected userInfra?: UserInfra;

    constructor(
        @inject(INFRA_IDENTIFIERS.UserInfra) userInfra: UserInfra,
        @inject(APP_IDENTIFIERS.UserApp) userApp: UserApp,
        @inject(INFRA_IDENTIFIERS.Oauth2TokenInfra) oauth2TokenInfra: Oauth2TokenInfra
    ) {
        this.userInfra = userInfra;
        this.userApp = userApp;
        this.oauth2TokenInfra = oauth2TokenInfra;
    }

    public async authenticateByStrategy(
        authData: { email?: string; password?: string; bearerToken?: string },
        strategy: AUTHENTICATION_STRATEGY
    ): Promise<object> {
        if (strategy === AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password) {
            return await this.authenticateByPassword(authData.email, authData.password);
        }
        if (strategy === AUTHENTICATION_STRATEGY.BEARER_TOKEN && authData.bearerToken) {
            return await this.authenticateByBearer(authData.bearerToken);
        }
        throw new Error('not_implemented');
    }

    public async cancelBearer(bearerToken: string) {
        const parsedToken: any = jwt.verify(bearerToken, 'config.secretJWT');
        const foundToken = await this.oauth2TokenInfra.findToken(this.verifyTokenContent(parsedToken));
        if (!foundToken) {
            throw new Error('invalid_token');
        }
        await this.oauth2TokenInfra.destroyToken(foundToken.accessToken);
    }

    private async authenticateByBearer(bearerToken: string): Promise<any> {
        const parsedToken: any = jwt.verify(bearerToken, 'config.secretJWT');

        const foundToken = await this.oauth2TokenInfra.findToken(this.verifyTokenContent(parsedToken));
        if (!foundToken) {
            throw new Error('invalid_token');
        }
        if (moment(foundToken.accessTokenExpirationDate).isBefore(moment())) {
            throw new Error('token_expired');
        }
        const user = await this.userApp.findUserById(foundToken.userId);
        return new User(this.userInfra, user as any).export();
    }

    private verifyTokenContent(
        token: any
    ): {
        accessToken: string;
        refreshToken: string;
        rememberMe: boolean;
        accessTokenExpirationDate: Date;
        userId: number;
    } {
        const validation = joi.validate(token, {
            accessToken: joi.string().required(),
            refreshToken: joi.string().required(),
            rememberMe: joi.boolean().required(),
            accessTokenExpirationDate: joi.date().required(),
            userId: joi.number().required(),
            iat: joi.number().required()
        });
        if (!validation.error) {
            return {
                accessToken: token.accessToken as string,
                refreshToken: token.refreshToken as string,
                rememberMe: token.rememberMe as boolean,
                accessTokenExpirationDate: new Date(token.accessTokenExpirationDate as number),
                userId: token.userId as number
            };
        }
        throw new Error('invalid_token');
    }

    private async authenticateByPassword(email: string, password: string): Promise<{ user: object; token: string }> {
        const user = await this.userApp.findUserByEmail(email);
        if (!user.verifyPassword(password)) {
            throw new Error('invalid_password');
        }
        let token = await this.generateBearer(user);
        return {
            user: user.export(),
            token
        };
    }

    private async generateBearer(user: User): Promise<string> {
        let token = {
            accessToken: crypto.randomBytes(32).toString('hex'),
            refreshToken: crypto.randomBytes(32).toString('hex'),
            accessTokenExpirationDate: moment()
                .add(1, 'day')
                .toDate(),
            userId: user.userId,
            rememberMe: false
        };
        await this.oauth2TokenInfra.createToken(token);
        return jwt.sign(token, 'config.secretJWT');
    }
}

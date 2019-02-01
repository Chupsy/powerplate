import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { Oauth2TokenResource } from '../../infra/resources/oauth2_token/oauth2_token.resource';
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';
import UserApp from '../user/user.app';
import APP_IDENTIFIERS from '../identifiers';
import User from '../user/user';
import * as moment from 'moment';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthenticateApp {
    protected userApp?: UserApp;
    protected oauth2TokenResource?: Oauth2TokenResource;
    constructor(
        @inject(APP_IDENTIFIERS.UserApp) userApp: UserApp,
        @inject(INFRA_IDENTIFIERS.Oauth2TokenResource) oauth2TokenResource: Oauth2TokenResource
    ) {
        this.userApp = userApp;
        this.oauth2TokenResource = oauth2TokenResource;
    }

    public async authenticateByStrategy(
        authData: { email?: string; password?: string; bearerToken?: string },
        strategy: AUTHENTICATION_STRATEGY
    ): Promise<object> {
        if (strategy === AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password) {
            return await this.authenticateByPassword(authData.email, authData.password);
        }
    }

    // public async refreshBearer(bearerToken: string) {}

    public async cancelBearer(bearerToken: string) {}

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

    private async authenticateByBearer(bearerToken: string) {
        let decoded = jwt.decode(bearerToken);
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
        await this.oauth2TokenResource.createToken(token);
        return jwt.sign(token, 'config.secretJWT');
    }
}

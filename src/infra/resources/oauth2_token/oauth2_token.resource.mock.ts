import { injectable, inject } from 'inversify';
import { Oauth2TokenResource, IToken } from './oauth2_token.resource';

@injectable()
export class Oauth2TokenResourceMock implements Oauth2TokenResource {
    public findToken(tokenData: {
        accessToken: string;
        refreshToken: string;
        rememberMe: boolean;
        accessTokenExpirationDate: Date;
        userId: number;
    }): Promise<IToken> {
        throw new Error('no_implemented_yet');
    }
    public destroyToken(accessToken: string): Promise<void> {
        throw new Error('no_implemented_yet');
    }
    public createToken(tokenData: {
        accessToken: string;
        refreshToken: string;
        rememberMe: boolean;
        accessTokenExpirationDate: Date;
        userId: number;
    }): Promise<IToken> {
        return null;
    }
}

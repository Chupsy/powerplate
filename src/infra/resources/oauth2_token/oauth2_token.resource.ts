export abstract class Oauth2TokenResource {
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
        throw new Error('no_implemented_yet');
    }
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
    rememberMe: boolean;
    accessTokenExpirationDate: Date;
    userId: number;
}

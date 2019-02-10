import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

export const Oauth2TokenSchema = new mongoose.Schema({
    accessToken: { type: String, required: true, trim: true },
    refreshToken: { type: String, required: true, trim: true },
    rememberMe: { type: Boolean, required: true },
    accessTokenExpirationDate: { type: Date, required: true },
    userId: { type: Number, required: true, unique: true, min: 0 },
    deletedAt: { type: Date, required: true }
});

export interface IToken {
    accessToken: string;
    refreshToken: string;
    rememberMe: boolean;
    accessTokenExpirationDate: Date;
    userId: number;
}

@injectable()
export class Oauth2TokenInfra {
    private Oauth2Token: mongoose.Model<mongoose.Document, {}>;

    public init(db: any) {
        this.Oauth2Token = db.model('Oauth2Token', Oauth2TokenSchema);
    }

    public async findToken(tokenData: {
        accessToken: string;
        refreshToken: string;
        rememberMe: boolean;
        accessTokenExpirationDate: Date;
        userId: number;
    }): Promise<IToken> {
        return this.convertDocumentToIToken(await this.Oauth2Token.findOne({ ...tokenData, deletedAt: null }));
    }
    public async destroyToken(accessToken: string): Promise<void> {
        await this.Oauth2Token.findOneAndUpdate({ accessToken }, { deletedAt: new Date() });
    }
    public async createToken(tokenData: {
        accessToken: string;
        refreshToken: string;
        rememberMe: boolean;
        accessTokenExpirationDate: Date;
        userId: number;
    }): Promise<IToken> {
        return this.convertDocumentToIToken(await this.Oauth2Token.create({ ...tokenData, deletedAt: null }));
    }

    private convertDocumentToIToken(token: mongoose.Document): IToken {
        if (!token) {
            return null;
        }
        let convertedToken = token.toObject();
        return {
            accessToken: convertedToken.accessToken,
            refreshToken: convertedToken.refreshToken,
            rememberMe: convertedToken.rememberMe,
            accessTokenExpirationDate: convertedToken.accessTokenExpirationDate,
            userId: convertedToken.userId
        };
    }
}

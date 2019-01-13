import { injectable, inject } from 'inversify';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
import { Oauth2TokenResource } from '../../infra/resources/oauth2_token/oauth2_token.resource';

@injectable()
export default class Oauth2App {
    protected oauth2TokenResource?: Oauth2TokenResource;
    constructor(@inject(INFRA_IDENTIFIERS.Oauth2TokenResource) oauth2TokenResource: Oauth2TokenResource) {
        this.oauth2TokenResource = oauth2TokenResource;
    }

    public async createToken(): Promise<object> {
        return null;
    }
}

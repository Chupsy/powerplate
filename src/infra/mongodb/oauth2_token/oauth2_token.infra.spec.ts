import { expect, assert } from 'chai';
import 'mocha';
import { modelMock } from './oauth2_token.model.mock';
import { Oauth2TokenInfra } from './oauth2_token.infra';
let oauth2TokenInfra = new Oauth2TokenInfra();
oauth2TokenInfra.init(modelMock);
describe('oauth2Token Infra Mongodb', () => {
    describe('findToken', () => {
        it('should return token if exist', async () => {
            let token = await oauth2TokenInfra.findToken({
                accessToken: 'azerty',
                accessTokenExpirationDate: new Date(),
                refreshToken: 'azerty',
                rememberMe: true,
                userId: 1
            });
            expect(token.userId).equal(1);
        });

        it('should not return token if exist', async () => {
            let token = await oauth2TokenInfra.findToken({
                accessToken: 'azerty',
                accessTokenExpirationDate: new Date(),
                refreshToken: 'azerty',
                rememberMe: true,
                userId: 12
            });
            expect(token).equal(null);
        });
    });
    it('should update the token with deleted at if destroyed', async () => {
        await oauth2TokenInfra.destroyToken('azerty');
    });
    it('should create the token', async () => {
        let token = await oauth2TokenInfra.createToken({
            accessToken: 'azerty',
            accessTokenExpirationDate: new Date(),
            refreshToken: 'azerty',
            rememberMe: true,
            userId: 12
        });
        expect(token.userId).equal(12);
    });
});

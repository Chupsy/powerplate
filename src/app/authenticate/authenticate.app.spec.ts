import { expect, assert } from 'chai';
import 'mocha';
import 'reflect-metadata';
import DOMAIN_IDENTIFIERS from '../identifiers';
import { Container } from 'inversify';
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';
import { AuthenticateApp } from './authenticate.app';
import UserApp from '../user/user.app';
import { UserAppMock } from '../user/user.app.mock';
import { Oauth2TokenResource } from '../../infra/resources/oauth2_token/oauth2_token.resource';
import { Oauth2TokenResourceMock } from '../../infra/resources/oauth2_token/oauth2_token.resource.mock';
import INFRA_IDENTIFIERS from '../../infra/identifiers';
let authenticateApp: AuthenticateApp;
beforeEach(() => {
    const container = new Container();
    container.bind<UserApp>(DOMAIN_IDENTIFIERS.UserApp).to(UserAppMock);
    container.bind<Oauth2TokenResource>(INFRA_IDENTIFIERS.Oauth2TokenResource).to(Oauth2TokenResourceMock);
    container
        .bind<AuthenticateApp>(DOMAIN_IDENTIFIERS.AuthenticateApp)
        .to(AuthenticateApp)
        .inSingletonScope();
    authenticateApp = container.get<AuthenticateApp>(DOMAIN_IDENTIFIERS.AuthenticateApp);
});

describe('Authenticate App', () => {
    describe('authenticateByPassword', () => {
        it('should return bearer token if correct password is given', async () => {
            let authData: any = await authenticateApp.authenticateByStrategy(
                { email: 'valid@email.com', password: 'valid' },
                AUTHENTICATION_STRATEGY.LOCAL
            );
            expect(authData.user.userId).equal(1);
            expect(authData.token).exist;
        });

        it('should refuse unexisting email', async () => {
            try {
                await authenticateApp.authenticateByStrategy(
                    { email: 'invalid@email.com', password: 'valid' },
                    AUTHENTICATION_STRATEGY.LOCAL
                );
                assert.fail('factory should throw an error if email does not exist');
            } catch (error) {
                expect(error.message).equal('data_not_found');
            }
        });

        it('should refuse invalid password', async () => {
            try {
                await authenticateApp.authenticateByStrategy(
                    { email: 'valid@email.com', password: 'invalid' },
                    AUTHENTICATION_STRATEGY.LOCAL
                );
                assert.fail('factory should throw an error if password is wrong');
            } catch (error) {
                expect(error.message).equal('invalid_password');
            }
        });
    });
});

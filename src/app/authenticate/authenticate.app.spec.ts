import { assert, expect } from 'chai';
import 'mocha';
import 'reflect-metadata';
import { AUTHENTICATION_STRATEGY } from '../constants/strategies';
import { AuthenticateApp } from './authenticate.app';
import UserApp from '../user/user.app';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { UserInfra } from '../../infra/mongodb/user/user.infra';
import { Oauth2TokenInfra } from '../../infra/mongodb/oauth2_token/oauth2_token.infra';
import * as sinon from 'sinon';
import User from '../user/user';
import * as sha256 from 'sha256';

let authenticateApp: AuthenticateApp;
let sandbox = sinon.createSandbox();

afterEach(() => {
    sandbox.restore();
});

describe('Authenticate App', () => {
    describe('authenticateByPassword', () => {
        it('should refuse invalid authentication', async () => {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            try {
                await authenticateApp.authenticateByStrategy({ email: 'valid@email.com', password: 'valid' }, null);
                assert.fail('should throw error if no strategy provided');
            } catch (e) {
                expect(e.message).to.equal('not_implemented');
            }
        });

        it('should return bearer token if correct password is given', async () => {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            sandbox.stub(userApp, 'findUserByEmail').resolves(
                new User(userInfra, {
                    userId: 1,
                    email: 'valid@email.com',
                    firstName: 'test',
                    lastName: 'test',
                    age: 12,
                    password: sha256('valid' + sha256('1234AZER')),
                    passwordSalt: '1234AZER'
                })
            );
            sandbox.stub(oauth2TokenInfra, 'createToken').resolves({
                accessToken: 'test',
                refreshToken: 'test',
                rememberMe: false,
                accessTokenExpirationDate: new Date(),
                userId: 1
            });
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            let authData: any = await authenticateApp.authenticateByStrategy(
                { email: 'valid@email.com', password: 'valid' },
                AUTHENTICATION_STRATEGY.LOCAL
            );
            expect(authData.user.userId).equal(1);
            expect(authData.token).exist;
        });

        it('should refuse not existing email', async () => {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            sandbox.stub(userApp, 'findUserByEmail').throws(new Error('data_not_found'));
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
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
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            sandbox.stub(userApp, 'findUserByEmail').resolves(
                new User(userInfra, {
                    userId: 1,
                    email: 'valid@email.com',
                    firstName: 'test',
                    lastName: 'test',
                    age: 12,
                    password: sha256('valid' + sha256('1234AZER')),
                    passwordSalt: '1234AZER'
                })
            );
            sandbox.stub(oauth2TokenInfra, 'createToken').resolves({
                accessToken: 'test',
                refreshToken: 'test',
                rememberMe: false,
                accessTokenExpirationDate: new Date(),
                userId: 1
            });
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
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
    describe('authenticateByBearer', () => {
        it('should authenticate a bearerToken and return an user', async function() {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            sandbox.stub(oauth2TokenInfra, 'findToken').resolves({
                accessToken: 'accessT0K3N',
                refreshToken: 'refreshT0K3N',
                accessTokenExpirationDate: moment()
                    .add(1, 'day')
                    .startOf('day')
                    .toDate(),
                userId: 1,
                rememberMe: false
            });
            sandbox
                .stub(userApp, 'findUserById')
                .withArgs(1)
                .resolves({
                    userId: 1,
                    email: 'valid@user.com',
                    firstName: 'test',
                    lastName: 'test',
                    age: 12
                });
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            const token = jwt.sign(
                {
                    accessToken: 'accessT0K3N',
                    refreshToken: 'refreshT0K3N',
                    accessTokenExpirationDate: moment()
                        .add(1, 'day')
                        .startOf('day')
                        .toDate(),
                    userId: 1,
                    rememberMe: false
                },
                'config.secretJWT'
            );
            let user: any = await authenticateApp.authenticateByStrategy(
                { bearerToken: token },
                AUTHENTICATION_STRATEGY.BEARER_TOKEN
            );
            expect(user.userId).to.equal(1);
            expect(user.email).to.equal('valid@user.com');
        });

        it('should refuse an invalid token', function(done) {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            const token = jwt.sign('invalidToken', 'config.secretJWT');
            authenticateApp
                .authenticateByStrategy({ bearerToken: token }, AUTHENTICATION_STRATEGY.BEARER_TOKEN)
                .then(() => {
                    assert.fail('no exception thrown');
                })
                .catch(e => {
                    expect(e.message).equal('invalid_token');
                    done();
                });
        });

        it('should refuse an not event jwt signed token', function(done) {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            const token = 'invalidToken';
            authenticateApp
                .authenticateByStrategy({ bearerToken: token }, AUTHENTICATION_STRATEGY.BEARER_TOKEN)
                .then(() => {
                    assert.fail('no exception thrown');
                })
                .catch(e => {
                    expect(e.message).equal('jwt malformed');
                    done();
                });
        });

        it('should refuse expired token', async function() {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            let token = {
                accessToken: 'accessT0K3NExp',
                refreshToken: 'refreshT0K3NExp',
                accessTokenExpirationDate: moment()
                    .subtract(1, 'day')
                    .startOf('day')
                    .toDate(),
                userId: 1,
                rememberMe: false
            };
            sandbox
                .stub(oauth2TokenInfra, 'findToken')
                .withArgs(token)
                .resolves(token);
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            const jwtToken = jwt.sign(token, 'config.secretJWT');
            try {
                await authenticateApp.authenticateByStrategy(
                    { bearerToken: jwtToken },
                    AUTHENTICATION_STRATEGY.BEARER_TOKEN
                );
                assert.fail('no exception thrown');
            } catch (e) {
                expect(e.message).to.equal('token_expired');
            }
        });

        it('should refuse token that does not exist', async function() {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            sandbox.stub(oauth2TokenInfra, 'findToken').resolves(null);
            const token = jwt.sign(
                {
                    accessToken: 'accessT0K3NExp',
                    refreshToken: 'refreshT0K3NExp',
                    accessTokenExpirationDate: moment()
                        .subtract(1, 'day')
                        .startOf('day')
                        .toDate(),
                    userId: 2,
                    rememberMe: false
                },
                'config.secretJWT'
            );
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);

            try {
                await authenticateApp.authenticateByStrategy(
                    { bearerToken: token },
                    AUTHENTICATION_STRATEGY.BEARER_TOKEN
                );
                assert.fail('no exception thrown');
            } catch (e) {
                expect(e.message).to.equal('invalid_token');
            }
        });
    });

    describe('cancelBearer', () => {
        it('should cancel a valid bearer token', async () => {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            const token = {
                accessToken: 'accessT0K3N',
                refreshToken: 'refreshT0K3N',
                accessTokenExpirationDate: moment()
                    .add(1, 'day')
                    .startOf('day')
                    .toDate(),
                userId: 1,
                rememberMe: false
            };
            sandbox
                .stub(oauth2TokenInfra, 'findToken')
                .withArgs(token)
                .resolves(token);
            sandbox
                .stub(oauth2TokenInfra, 'destroyToken')
                .withArgs('accessT0K3N')
                .resolves();
            const signedToken = jwt.sign(token, 'config.secretJWT');
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);

            expect(() => authenticateApp.cancelBearer(signedToken)).not.to.throw();
        });

        it('should refuse a token if not found', async () => {
            let userInfra = new UserInfra();
            let userApp = new UserApp(userInfra);
            let oauth2TokenInfra = new Oauth2TokenInfra();
            const token = {
                accessToken: 'accessT0K3N',
                refreshToken: 'refreshT0K3N',
                accessTokenExpirationDate: moment()
                    .add(1, 'day')
                    .startOf('day')
                    .toDate(),
                userId: 2,
                rememberMe: false
            };
            sandbox
                .stub(oauth2TokenInfra, 'findToken')
                .withArgs(token)
                .resolves(null);
            authenticateApp = new AuthenticateApp(userInfra, userApp, oauth2TokenInfra);
            const signedToken = jwt.sign(token, 'config.secretJWT');
            try {
                await authenticateApp.cancelBearer(signedToken);
                assert.fail('no exception thrown');
            } catch (e) {
                expect(e.message).to.equal('invalid_token');
            }
        });
    });
});

import * as passport from 'passport';
import * as localStrategy from 'passport-local';
import UserApp from '../../../../app/user/user.app';
export function configure(userApp: UserApp) {
    passport.use(
        'local',
        new localStrategy.Strategy(async function(username, password, done) {
            let user = await userApp.authenticateUser(username, password);
            return done(null, user);
        })
    );
}

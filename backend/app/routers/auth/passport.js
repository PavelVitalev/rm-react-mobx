import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import UserService from '../users/service';

class Passport {
  secret = null;

  static init = (secret) => new Passport(secret);

  static initialize = () => passport.initialize();

  static session = () => passport.session();

  static authenticateLocal = (request, response, next) =>
      passport.authenticate('local', { session: true }, next(request, response))(request, response);

  static authenticateJwt = (request, response, handler) =>
      passport.authenticate('jwt', { session: false }, handler)(request, response);

  constructor(secret) {
    this.secret = secret;
    this.setUpStrategies();
  }

  setUpStrategies = () => {
    passport.use(this.getLocalStrategy());
    passport.use(this.getJwtStrategy());
  };

  getLocalStrategy = () => new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, this.localStrategyHandler);

  localStrategyHandler = async(email, password, done) => {
    try {
      const user = await UserService.getUserInstanceByEmail(email);

      if (!user) {
        return done(new Error('Incorrect email'), null);
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return done(new Error('Incorrect password'), null);
      }

      return done(null, user);
    } catch (error) {
      console.warn(error);
      done(error, null);
    }
  };

  getJwtStrategy = () => new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: this.secret,
  }, this.jwtStrategyHandler);

  jwtStrategyHandler = async (jwtPayload, done) => {
    try {
      const userId = jwtPayload.sub.id;
      const user = await UserService.getUserInstanceById(userId);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };
};

export default Passport;

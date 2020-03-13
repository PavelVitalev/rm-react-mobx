import { statusCodes } from 'constants/status';
import Response from 'core/response';

import Passport from '../routers/auth/passport';

const authHandler = (request, response, next) => (error, user, info) => {
  if (error || !user) {
    Response.error(response, (info && info.message) || 'Invalid token', statusCodes.UNAUTHORIZED);
    return;
  }
  if (info && info.message) {
    Response.error(response, info.message, statusCodes.UNAUTHORIZED);
    return;
  }

  request.user = user;

  next();
};

const authenticateJwt = (request, response, next) =>
    Passport.authenticateJwt(request, response, authHandler(request, response, next));
    // passport.authenticate('jwt', { session: false }, authHandler(request, response, next))(request, response);

export default authenticateJwt;

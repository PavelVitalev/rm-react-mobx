import { USER_PREFIX } from 'constants';
import UserController from './controller';
import Router from 'core/router';
import authenticateJwt from 'middleware/auth';

class UserRouter extends Router {
  static PREFIX = USER_PREFIX;

  static CONTROLLER = UserController;

  static MIDDLEWARE = [
    authenticateJwt
  ];

  static ROUTES = [
    {
      method: 'get',
      path: '/current',
      middleware: [],
      controllerMethod: ({ getAuthenticatedUser }) => getAuthenticatedUser,
    },
  ];
}

export default UserRouter;

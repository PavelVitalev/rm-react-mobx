import { AUTH_PREFIX } from 'constants';
import Router from 'core/router';

import AuthController from './controller';

class AuthRouter extends Router {
  static PREFIX = AUTH_PREFIX;

  static CONTROLLER = AuthController;

  static MIDDLEWARE = [];

  static ROUTES = [
    {
      method: 'post',
      path: '/signup',
      middleware: [],
      controllerMethod: ({ signUp }) => signUp,
    },
    {
      method: 'post',
      path: '/signin',
      middleware: [],
      controllerMethod: ({ signIn }) => signIn,
    },
  ];
}

export default AuthRouter;

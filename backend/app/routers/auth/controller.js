import Response from 'core/response';
import { createToken } from 'utils/auth';
import Passport from './passport';

import { statusCodes } from '@app/constants/status';

import UserService from '../users/service';

class AuthController {
  signUp = async (request, response) => {
    const { email, password, name } = request.body;
    try {
      const userInstance = await UserService.getUserInstanceByEmail(email);

      if (userInstance) {
        Response.error(response, 'Email is already taken');
        return;
      }

      const newUser = await UserService.createUser(email, password, name);

      request.login(newUser, { session: false });

      const token = createToken(newUser._id);

      Response.success(response, { user: newUser, token });
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };

  signIn = async(request, response) => {
    Passport.authenticateLocal(request, response, this.signInHandler);
  };

  signInHandler = (request, response) => async(passportError, user) => {
    if (passportError) {
      // Response.error(response, passportError.message, statusCodes.UNAUTHORIZED);
      Response.error(response, passportError.message);
      return;
    }

    if (!user) {
      Response.error(response, 'User doesn\'t exist', statusCodes.UNAUTHORIZED);
      return;
    }

    try {
      const token = createToken(user._id);

      await request.login(user, { session: false });

      Response.success(response, { user: user.getData(), token });
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.UNAUTHORIZED);
    }
  }
}

export default AuthController;

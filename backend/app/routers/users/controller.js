import Response from 'core/response';

import { statusCodes } from '@app/constants/status';

class UserController {
  getAuthenticatedUser = async (request, response) => {
    try {
      if (!request.user) {
        throw new Error('User not found');
      }
      Response.success(response, { user: request.user });
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.UNAUTHORIZED);
    }
  };
}

export default UserController;

import { statusCodes } from 'constants/status';

class Response {
  static success = (response, data) => {
    response.json({ success: true, data });
  };

  static error(response, message, status = statusCodes.BAD_REQUEST) {
    response.status(status).send({ success: false, message });
  }
}

export default Response;

import Response from 'core/response';

import CommentService from './service';

class CommentController {
  createComment = async (request, response) => {
    try {
      const data = request.body;
      const { taskId } = request.params;

      const comment = await CommentService.createComment(data, taskId);

      Response.success(response, comment);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };

  deleteComment = async (request, response) => {
    try {
      const { commentId } = request.params;
      const { taskId } = request.body;

      const comment = await CommentService.deleteComment(commentId, taskId);

      Response.success(response, comment);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };
}

export default CommentController;

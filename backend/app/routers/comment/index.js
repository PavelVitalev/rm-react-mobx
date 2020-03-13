import CommentController from './controller';
import Router from 'core/router';

class CommentRouter extends Router {
  static PREFIX = '';

  static CONTROLLER = CommentController;

  static MIDDLEWARE = [];

  static ROUTES = [
    {
      method: 'post',
      path: '/comments/:taskId',
      middleware: [],
      controllerMethod: ({ createComment }) => createComment,
    },
    {
      method: 'delete',
      path: '/comments/:commentId',
      middleware: [],
      controllerMethod: ({ deleteComment }) => deleteComment,
    }
  ];
}

export default CommentRouter;

import PostController from './controller';
import Router from 'core/router';

class ColumnRouter extends Router {
  static PREFIX = '';

  static CONTROLLER = PostController;

  static MIDDLEWARE = [];

  static ROUTES = [
    {
      method: 'post',
      path: '/columns/:boardId',
      middleware: [],
      controllerMethod: ({ createColumn }) => createColumn,
    },
    {
      method: 'put',
      path: '/columns/:columnId',
      middleware: [],
      controllerMethod: ({ updateColumn }) => updateColumn,
    },
    {
      method: 'delete',
      path: '/columns/:columnId',
      middleware: [],
      controllerMethod: ({ deleteColumn }) => deleteColumn
    }
  ];
}

export default ColumnRouter;

import BoardController from './controller';
import Router from 'core/router';

class BoardRouter extends Router {
  static PREFIX = '';

  static CONTROLLER = BoardController;

  static MIDDLEWARE = [];

  static ROUTES = [
    {
      method: 'get',
      path: '/boards',
      middleware: [],
      controllerMethod: ({ getBoards }) => getBoards,
    },
    {
      method: 'get',
      path: '/boards/:boardId',
      middleware: [],
      controllerMethod: ({ getBoardsById }) => getBoardsById,
    },
    {
      method: 'post',
      path: '/boards',
      middleware: [],
      controllerMethod: ({ createBoard }) => createBoard,
    },
    {
      method: 'put',
      path: '/boards/:boardId',
      middleware: [],
      controllerMethod: ({ updateBoard }) => updateBoard,
    },
    {
      method: 'delete',
      path: '/boards/:boardId',
      middleware: [],
      controllerMethod: ({ deleteBoard }) => deleteBoard,
    },
    {
      method: 'patch',
      path: '/boards/:boardId',
      middleware: [],
      controllerMethod: ({ addUserOnBoard }) => addUserOnBoard,
    }
  ];
}

export default BoardRouter;

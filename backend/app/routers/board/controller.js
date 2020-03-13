import Response from 'core/response';
import BoardService from './service';

import { statusCodes } from '@app/constants/status';

class BoardController {
  getBoards = async (request, response) => {
    try {
      const boards = await BoardService.getBoards();

      Response.success(response, boards);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  getBoardsById = async (request, response) => {
    try {
      const { boardId } = request.params;

      const board = await BoardService.getBoardById(boardId);

      Response.success(response, board);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  createBoard = async (request, response) => {
    try {
      const { body } = request;

      const board = await BoardService.createBoard(body);
      Response.success(response, board);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };

  updateBoard = async (request, response) => {
    try {
      const { boardId } = request.params;
      const { body } = request;

      const board = await BoardService.updateBoard(boardId, body);

      Response.success(response, board);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  deleteBoard = async (request, response) => {
    try {
      const { boardId } = request.params;

      if (boardId === '5d36ed04fc4d89142cb39340') {
        throw Error('Not enough rights to delete.');
      }

      const board = await BoardService.deleteBoard(boardId);

      Response.success(response, board);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  addUserOnBoard = async (request, response) => {
    try {
      const { boardId } = request.params;
      const { userId } = request.body;

      const board = await BoardService.addUser(boardId, userId);

      Response.success(response, board);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  }
}

export default BoardController;

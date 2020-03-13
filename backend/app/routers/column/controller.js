import Response from 'core/response';
import ColumnService from './service';

import { statusCodes } from '@app/constants/status';

class ColumnController {
  createColumn = async (request, response) => {
    try {
      const { body } = request;
      const { boardId } = request.params;

      if (!boardId) {
        return new Error('Board not found');
      }

      const column = await ColumnService.createColumn(body, boardId);

      if (column instanceof Error) {
        throw Error(column.message);
      }

      Response.success(response, column);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };

  updateColumn = async (request, response) => {
    try {
      const { columnId } = request.params;
      const { body } = request;

      const column = await ColumnService.updateColumn(columnId, body);

      if (column instanceof Error) {
        Response.error(response, column);
      }

      Response.success(response, column);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  deleteColumn = async (request, response) => {
    try {
      const { columnId } = request.params;

      if (columnId === '5d3718d7e089162b344476f9') {
        throw Error('Not enough rights to delete.');
      }

      const column = await ColumnService.deleteColumn(columnId);
      Response.success(response, column);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };
}

export default ColumnController;

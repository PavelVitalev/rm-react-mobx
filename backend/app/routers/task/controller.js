import Response from 'core/response';
import TaskService from './service';

import { statusCodes } from '@app/constants/status';

class TaskController {
  createTask = async (request, response) => {
    try {
      const { body } = request;
      const { columnId } = request.params;

      if (!columnId) {
        return new Error('Column not found');
      }

      const task = await TaskService.createTask(columnId, body);

      if (task instanceof Error) {
        throw new Error(task.message);
      }

      Response.success(response, task);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message);
    }
  };

  updateTask = async (request, response) => {
    try {
      const { taskId } = request.params;
      const { body } = request;

      const task = await TaskService.updateTask(taskId, body);

      Response.success(response, task);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  deleteTask = async (request, response) => {
    try {
      const { taskId } = request.params;

      if (taskId === '5d371dab03b795511c6012dc') {
        throw Error('Not enough rights to delete.');
      }

      const task = await TaskService.deleteTask(taskId);

      Response.success(response, task);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  addUserOnTask = async (request, response) => {
    try {
      const { taskId } = request.params;
      const { userId } = request.body;

      const task = await TaskService.addUser(taskId, userId);

      Response.success(response, task);
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  addMaskOnTask = async (request, response) => {
    try {
      const { taskId } = request.params;
      const { mark } = request.body;

      const task = await TaskService.addMark(taskId, mark);

      Response.success(response, task);
    } catch (error) {
        const { message } = error;

        console.warn(error);
        Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };

  moveTask = async (request, response) => {
    try {
      await TaskService.moveTask(request.body);

      Response.success(response, {});
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND);
    }
  };
}

export default TaskController;

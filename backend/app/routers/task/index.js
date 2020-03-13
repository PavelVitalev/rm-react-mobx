import TaskController from './controller';
import Router from 'core/router';

class TaskRouter extends Router {
  static PREFIX = '';

  static CONTROLLER = TaskController;

  static MIDDLEWARE = [];

  static ROUTES = [
    {
      method: 'post',
      path: '/tasks/:columnId',
      middleware: [],
      controllerMethod: ({ createTask }) => createTask,
    },
    {
      method: 'put',
      path: '/tasks/:taskId',
      middleware: [],
      controllerMethod: ({ updateTask }) => updateTask,
    },
    {
      method: 'delete',
      path: '/tasks/:taskId',
      middleware: [],
      controllerMethod: ({ deleteTask }) => deleteTask,
    },
    {
      method: 'patch',
      path: '/tasks/:taskId',
      middleware: [],
      controllerMethod: ({ addUserOnTask }) => addUserOnTask
    },
    {
      method: 'patch',
      path: '/tasks/masks/:taskId',
      middleware: [],
      controllerMethod: ({ addMaskOnTask }) => addMaskOnTask
    },
    {
      method: 'patch',
      path: '/tasks',
      middleware: [],
      controllerMethod: ({ moveTask }) => moveTask
    }
  ];
}

export default TaskRouter;

import Task from './model';
import Column from '../column/model';
import CommentService from '../comment/service';

import { reorder, move } from '@app/utils/dnd';

const populateOptions = {
  task: [
    {
      model: 'User',
      path: 'users'
    },
    {
      model: 'Comment',
      path: 'comments'
    }
  ]
};

const populateColumnOptions = {
  model: 'Task',
  path: 'tasks',
  populate: [
    {
      model: 'User',
      path: 'users'
    },
    {
      model: 'Comment',
      path: 'comments'
    }
  ]
};

class TaskService {
  static createTask = async (columnId, body) => {
    const task = new Task({
      task: body.task
    });

    await Column.findOne({ _id: columnId }, (err, column) => {
      if (column === null || err) {
        return new Error('Column not found');
      }
      task.save();

      column.tasks.push(task);
      column.save();
    });

    return task.getData();
  };

  static updateTask = async (id, body) => {
    const task = await Task.findOneAndUpdate({ _id: id }, { $set: body })
        .populate(populateOptions.task);

    TaskService.isTask(task);

    const newTask = task.getData();
      console.log(newTask);
    return { ...newTask, task: body.task };
  };

  static deleteTask = async (id) => {
    const task = await Task.findOne({ _id: id });

    TaskService.isTask(task);

    task.comments.forEach(comment => {
      CommentService.deleteAllCommentsInTask(comment._id);
    });

    await Task.deleteOne({ _id: id });
    return {
      status: true,
      id
    };
  };

  static addUser = async (taskId, userId) => {
    const task = await Task.findOne({ _id: taskId });

    if (task.users.indexOf(userId) === -1) {
      task.users.push(userId);
    } else {
      task.users = task.users.filter(id => id != userId);
    }

    await task.save();

    const updatedTask = await Task.findOne({ _id: taskId })
      .populate(populateOptions.task);

    return updatedTask.getData();
  };

  static addMark = async (taskId, mark) => {
    await TaskService.isMark(mark);

    const task = await Task.findOne({ _id: taskId });

    if (task.marks.some((color) => color === mark)) {
      task.marks = task.marks.filter((color) => color !== mark);
    } else {
      task.marks.push(mark);
    }

    if (task.marks.length) {
      // sort A-Z
      task.marks = task.marks.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
    }

    await task.save();

    const updatedTask = await Task.findOne({ _id: taskId })
      .populate(populateOptions.task);

    return updatedTask.getData();
  };

  static moveTask = async (body) => {
    const { source, destination } = body;

    if (!destination) {
      return;
    }

    const columnStart = await Column.findOne({ _id: source.droppableId })
      .populate(populateColumnOptions);

    if (source.droppableId === destination.droppableId) {
      const reorderTasks = reorder(columnStart.tasks, source.index, destination.index);

      columnStart.tasks = reorderTasks;

      await columnStart.save();
    }

    if (source.droppableId !== destination.droppableId) {
    const columnEnd = await Column.findOne({ _id: destination.droppableId })
      .populate(populateColumnOptions);

      const updatedTasks = move(
        columnStart.tasks,
        columnEnd.tasks,
        source,
        destination
      );

      for (const key in updatedTasks) {
        if (key == columnStart._id) {
          columnStart.tasks = updatedTasks[key];
          await columnStart.save();
        }

        if (key == columnEnd._id) {
          columnEnd.tasks = updatedTasks[key];
          await columnEnd.save();
        }
      }
    }
  };

  static isTask = async (task) => {
    if (!task) {
      throw Error('Task not found');
    }
  };

  static isMark = async (mark) => {
    const marksExample = ['green', 'yellow', 'orange', 'red', 'purple', 'blue'];

    if (!marksExample.some((color) => color === mark)) {
      throw Error('Color uncorrect');
    }
  };
}

export default TaskService;

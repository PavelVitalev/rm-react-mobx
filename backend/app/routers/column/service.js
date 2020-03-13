import Column from './model';
import Board from '../board/model';
import TaskService from '../task/service';

class ColumnService {
  static getColumnById = async (id) => {
    const column = await Column.findOne({ _id: id })
      .populate('tasks');

    return column;
  };

  static createColumn = async (data, boardId) => {
    const column = new Column({
      title: data.title
    });

    const board = await Board.findOne({ _id: boardId }, (err, board) => {
      if (!board || err) {
        return new Error('Board not found');
      }
      column.save();

      board.columns.push(column._id);
      board.save();
    });

    if (!board) {
      return new Error('Board not found');
    }

    return column.getData();
  };

  static updateColumn = async (id, body) => {
    const column = await Column.findOneAndUpdate({ _id: id }, { $set: body });

    ColumnService.isColumn(column);

    const newColumn = column.getData();
    return { ...newColumn, title: body.title };
  };

  static deleteColumn = async (id) => {
    const column = await ColumnService.getColumnById(id);

    ColumnService.isColumn(column);

    column.tasks.forEach(task => {
      TaskService.deleteTask(task._id);
    });

    await Column.deleteOne({ _id: id });
    return {
      status: true,
      id
    };
  };

  static isColumn = column => {
    if (!column) {
      throw Error('Column not found');
    }
  }
}

export default ColumnService;

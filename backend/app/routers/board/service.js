import Board from './model';
import ColumnService from '../column/service';
import { extractDataFromModelInstances } from '@app/utils/models';

const populateBoardOptions = {
  users: 'users',
  columns: {
    model: 'Column',
    path: 'columns',
    select: 'title _id',
    populate: {
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
    }
  }
};

class BoardService {
  static getBoards = async () => {
    const boards = await Board.find({})
      .populate(populateBoardOptions.users)
      .populate([populateBoardOptions.columns]);

    return {
      boards: extractDataFromModelInstances(boards)
    };
  };

  static getBoardById = async (id) => {
    const board = await Board.findOne({ _id: id })
      .populate(populateBoardOptions.users)
      .populate([populateBoardOptions.columns]);

    BoardService.isBoard(board);

    return board.getData();
  };

  static createBoard = async (data) => {
    const board = new Board({
      title: data.title
    });
    await board.save();

    return {
      board: board.getData()
    };
  };

  static updateBoard = async (id, body) => {
    const board = await Board.findOneAndUpdate({ _id: id }, { $set: body });

    BoardService.isBoard(board);

    const newBoard = board.getData();
    return { ...newBoard, title: body.title };
  };

  static deleteBoard = async (id) => {
    const board = await Board.findOne({ _id: id })
      .populate(populateBoardOptions.users)
      .populate([populateBoardOptions.columns]);

    BoardService.isBoard(board);

    board.columns.forEach(column => {
      ColumnService.deleteColumn(column._id);
    });

    await Board.deleteOne({ _id: id });

    return {
      status: true,
      id
    };
  };

  static addUser = async (boardId, userId) => {
    const board = await Board.findOne({ _id: boardId });

    BoardService.isBoard(board);

    if (board.users.indexOf(userId) === -1) {
      board.users.push(userId);
    } else {
      board.users = board.users.filter(id => id != userId);
    }

    await board.save();

    const updatedBoard = await Board.findOne({ _id: boardId })
      .populate(populateBoardOptions.users)
      .populate([populateBoardOptions.columns]);

    return updatedBoard.getData();
  };

  static isBoard = board => {
    if (!board) {
      throw Error('Board not found');
    }
  }
}

export default BoardService;

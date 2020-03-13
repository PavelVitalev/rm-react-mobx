import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import boardsStore from 'containers/boards/store';

import { reorder, move } from '@utils/dnd';

class BoardStore {
  @observable board;

  @observable isLoading = false;

  @action
  setIsLoading(value) {
    this.isLoading = value;
  }

  @action
  setBoard(board) {
    this.board = board;
  }

  @action
  getBoard(id) {
    this.setIsLoading(true);

    this.findBoardInStore(id);

    axios.get(`/boards/${id}`)
      .then((response) => {
        // console.log(response);
        if (response && response.data && response.data.success) {
          const board = response.data.data;
          this.setBoard(board);
          this.setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setIsLoading(false);
      });
  }

  @action
  deleteColumn(columnId) {
    this.board.columns = this.board.columns.filter((column) => column._id !== columnId);
  }

  @action
  deleteTaskInColumn(taskId, columnId) {
    const updateBoard = toJS(this.board);

    const findColumn = updateBoard.columns.find((column) => column._id === columnId);

    findColumn.tasks = findColumn.tasks.filter((task) => task._id !== taskId);

    updateBoard.columns = updateBoard.columns.map((column) => {
      if (column._id === columnId) {
        return findColumn;
      }

      return column;
    });

    this.board = updateBoard;
  }

  @action
  editTask(taskId, columnId, updateTask) {
    const updateBoard = toJS(this.board);

    const findColumn = updateBoard.columns.find((column) => column._id === columnId);

    findColumn.tasks = findColumn.tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, task: updateTask };
      }

      return task;
    });

    updateBoard.columns = updateBoard.columns.map((column) => {
      if (column._id === columnId) {
        return findColumn;
      }

      return column;
    });

    this.board = updateBoard;
  }

  @action
  addTask(columnId, task) {
    const updateBoard = toJS(this.board);

    const findColumn = updateBoard.columns.find((column) => column._id === columnId);

    findColumn.tasks.push({ task, _id: new Date().getTime() });

    this.board = updateBoard;
  }

  deleteComment(commentId, taskId, columnId) {
    const updateBoard = toJS(this.board);
    const findColumn = updateBoard.columns.find((column) => column._id === columnId);
    const findTask = findColumn.tasks.find((task) => task._id === taskId);

    findTask.comments = findTask.comments.filter((comment) => {
      return comment._id !== commentId;
    });

    this.board = updateBoard;
  }

  addCommnet(commentData, taskId, columnId) {
    const updateBoard = toJS(this.board);
    const findColumn = updateBoard.columns.find((column) => column._id === columnId);
    const findTask = findColumn.tasks.find((task) => task._id === taskId);

    findTask.comments.push({ ...commentData, _id: new Date().getTime() })

    this.board = updateBoard;
  }

  findBoardInStore(id) {
    let findBoard;

    if (boardsStore.boards.length) {
      findBoard = boardsStore.boards.find((board) => board._id === id);
    }

    if (findBoard) {
      this.setBoard(findBoard);
      this.setIsLoading(false);
    }
  }

  updateColumnById(id, title) {
    this.board.columns = this.board.columns.map((column) => {
      if (column._id === id) {
        return { ...column, title };
      }

      return column;
    });
  }

  updateTaskMark(mark, columnId, taskId) {
    const updateBoard = toJS(this.board);
    const findColumn = updateBoard.columns.find((column) => column._id === columnId);
    const findTask = findColumn.tasks.find((task) => task._id === taskId);
    const isSelectedMark = findTask.marks.some((findMark) => findMark === mark);

    if (isSelectedMark) {
      findTask.marks = findTask.marks.filter((findMark) => findMark !== mark);
    }

    if (!isSelectedMark) {
      findTask.marks.push(mark);
      // sort A-Z
// eslint-disable-next-line no-nested-ternary
      findTask.marks = findTask.marks.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    }

    this.board = updateBoard;
  }

  getTasksByColumnId(columnId) {
    const normalBoard = toJS(this.board);
    const findColumn = normalBoard.columns.find((column) => column._id === columnId);
    return findColumn.tasks;
  }

  setTasksByColumnId(columnId, tasks) {
    const normalBoard = toJS(this.board);
    const findColumn = normalBoard.columns.find((column) => column._id === columnId);
    findColumn.tasks = [...tasks];
    this.setBoard(normalBoard);
  }

  onDragEnd() {
    return (result) => {
      console.log(result);

      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const reorderTasks = reorder(
          this.getTasksByColumnId(source.droppableId),
          source.index,
          destination.index
        );
        this.setTasksByColumnId(source.droppableId, reorderTasks);
      }

      if (source.droppableId !== destination.droppableId) {
        const updatedTasks = move(
          this.getTasksByColumnId(source.droppableId),
          this.getTasksByColumnId(destination.droppableId),
          source,
          destination
        );

        for (const key in updatedTasks) {
          this.setTasksByColumnId(key, updatedTasks[key]);
        }
      }

      this.requestDND({ source, destination, draggableId });
    };
  }

  requestDND(data) {
    axios.patch('/tasks', { ...data })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const boardStore = new BoardStore();
export default boardStore;
export { BoardStore };

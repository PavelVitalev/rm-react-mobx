import { observable, action } from 'mobx';
import axios from 'axios';

class BoardsStore {
  @observable boards = [];

  @observable isLoading = false;

  @observable isShowCreateBoard = false;

  @action
  setBoards(boards) {
    this.boards = boards;
  }

  @action
  setIsLoading(value) {
    this.isLoading = value;
  }

  @action
  getBoards() {
    if (!this.boards.length) {
      this.setIsLoading(true);
    }

    axios.get('/boards')
      .then((response) => {
      if (response && response.data && response.data.success) {
        this.setBoards(response.data.data.boards);
      }
        // console.log(response);
        this.setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        this.setIsLoading(false);
      });
  }

  @action
  updateBoard(board) {
    this.boards = this.boards.map((findBoard) => (findBoard._id === board._id ? board : findBoard));
  }

  @action.bind()
  toggleShowModalCreateBoard() {
    this.isShowCreateBoard = !this.isShowCreateBoard;

    if (this.isShowCreateBoard) {
      window.scroll(0, 0);
    }
  }

  addNewBoard(board) {
    this.boards.push(board);
  }
}

const boardsStore = new BoardsStore();
export default boardsStore;
export { BoardsStore };

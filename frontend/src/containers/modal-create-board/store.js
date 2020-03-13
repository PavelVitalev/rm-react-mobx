import { observable, action } from 'mobx';
import axios from 'axios';

import boardsStore from 'containers/boards/store';

class CreateBoardStore {
  @observable newBoardTitle = '';

  @observable isLoading = false;

  @action
  onTitleChange(value) {
    this.newBoardTitle = value;
  }

  @action
  setIsLoading(value) {
    this.isLoading = value;
  }

  @action
  createBoard(event) {
    event.preventDefault();

    if (this.newBoardTitle.trim && !this.newBoardTitle.trim().length) {
      this.toggleShowModalCreateBoard();
      return;
    }

    axios.post('/boards', { title: this.newBoardTitle.trim() })
      .then((response) => {
        if (response && !response.statusText === 'OK') {
          return;
        }

        boardsStore.addNewBoard(response.data.data.board);
        this.toggleShowModalCreateBoard();
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  @action
  enterDown(event) {
    if (event.keyCode === 27) {
      this.toggleShowModalCreateBoard();
    }
  }

  @action
  toggleShowModalCreateBoard() {
    boardsStore.toggleShowModalCreateBoard();
    this.onTitleChange('');
  }
}

const createBoardStore = new CreateBoardStore();
export default createBoardStore;
export { CreateBoardStore };

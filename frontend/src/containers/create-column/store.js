import { observable, action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';

class CreateColumnStore {
  @observable isOpen = false;

  @observable newColumnTitle = '';

  @action
  onTitleChange(value) {
    this.newColumnTitle = value;
  }

  @action
  setIsOpen(value) {
    this.isOpen = value;
  }

  @action
  createColumn(event, boardId) {
    event.preventDefault();
    if (!this.newColumnTitle.length) {
      this.setIsOpen(false);
      return;
    }

    boardStore.setIsLoading(true);

    axios.post(`/columns/${boardId}`, { title: this.newColumnTitle })
      .then((response) => {
        boardStore.getBoard(boardId);
        this.closeCreateColumn();
      })
      .catch((error) => {
        console.warn(error);
        this.closeCreateColumn();
      });
  }

  @action
  enterKey(event) {
    if (event.keyCode === 27) {
      this.closeCreateColumn();
    }
  }

  @action
  closeCreateColumn() {
    this.newColumnTitle = '';
    this.setIsOpen(false);
  }
}

const createColumnStore = new CreateColumnStore();
export default createColumnStore;
export { CreateColumnStore };

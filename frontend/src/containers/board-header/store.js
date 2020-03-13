import { observable, action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';
import boadrsStore from 'containers/boards/store';
import isAuthentication from 'utils/auth';

class BoardHeaderStore {
  @observable isEdit = false;

  @observable title;

  @observable inputWidth;

  @action
  initTitle(title) {
    this.title = title;
  }

  @action
  setIsEditTitle(value) {
    this.isEdit = value;
    if (this.title.trim) {
      this.title = this.title.trim();
    }
  }

  @action
  onTitleChange(target) {
    this.title = target.value;

// eslint-disable-next-line no-param-reassign
    target.style.width = this.getInputWidth();
  }

  @action
  updateBoardTitle() {
    this.setIsEditTitle(false);

    if (this.title.trim && !this.title.trim().length) {
      this.title = boardStore.board.title;
      return;
    }

    if (boardStore.board.title === this.title.trim()) {
      return;
    }

    boardStore.setBoard({ ...boardStore.board, title: this.title.trim() });

    axios.put(`/boards/${boardStore.board._id}`, { title: this.title.trim() })
      .then((response) => {
        if (response && response.data && response.data.success) {
          boadrsStore.updateBoard(boardStore.board);
        }
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  @action
  deleteBoard(id, history) {
    boadrsStore.setIsLoading(true);

    axios.delete(`/boards/${id}`)
      .then((response) => {
        if (response && !response.statusText === 'OK') {
          return;
        }

        history.push('/boards');
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  @action
  attachUserToBoard(boardId) {
    axios.patch(`/boards/${boardId}`, { userId: isAuthentication.user._id })
      .then((response) => {
        // console.log(response);
        boardStore.setBoard(response.data.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  @action
  enterDown(event) {
    if (event.keyCode === 27) {
      this.title = boardStore.board.title;
      this.setIsEditTitle(false);
    }

    if (event.keyCode === 13) {
      this.updateBoardTitle();
    }
  }

  @action
  getInputWidth() {
    return `${(this.title.length + 5) * 8}px`;
  }

  @action
  isSubscribe(users) {
    if (isAuthentication.user) {
      return users.some((e) => e._id === isAuthentication.user._id);
    }

    return false;
  }
}

const boardHeaderStore = new BoardHeaderStore();
export default boardHeaderStore;
export { BoardHeaderStore };

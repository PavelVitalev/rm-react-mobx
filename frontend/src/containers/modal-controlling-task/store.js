import { observable, computed, action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';
import isAuthentication from 'utils/auth';

class ModalControllingTaskStore {
  @observable task = {};

  @observable currentTaskTitle = '';

  @observable taskTitle = '';

  @observable isSubscribe = false;

  @observable isOpenTitleEditor = false;

  @observable isOpenCommentCreator = false;

  @action
  setTask(task) {
    this.task = task;
  }

  @action
  setTaskTitle(title) {
    this.taskTitle = title;
  }

  @action
  setIsOpenTitleEditor(value) {
    this.isOpenTitleEditor = value;
  }

  @action
  setIsSubscribe(value) {
    this.isSubscribe = value;
  }

  @action
  setIsOpenCommentCreator(value) {
    this.isOpenCommentCreator = value;
  }

  @action
  checkIsSubscribe(subscribeUsers) {
    if (!subscribeUsers.length) {
      this.setIsSubscribe(false);
    }

    const isSubscribe = subscribeUsers.some((user) => user._id === isAuthentication.user._id);

    this.setIsSubscribe(isSubscribe);
  }

  @action
  keyDown(event) {
    if (event.keyCode === 27) {
      this.cancelEditTitle();
    }

    if (event.keyCode === 13) {
      this.onSendEditTitle();
    }
  }

  @action
  cancelEditTitle() {
    this.setTaskTitle(this.task.task);
    this.setIsOpenTitleEditor(false);
  }

  @action
  onSendEditTitle() {
    if (this.taskTitle.trim && !this.taskTitle.trim().length) {
      this.cancelEditTitle();
      return;
    }

    if (this.taskTitle.trim && (this.taskTitle.trim() === this.task.task)) {
      this.cancelEditTitle();
      return;
    }

    axios.put(`/tasks/${this.task._id}`, { task: this.taskTitle.trim() })
      .then((response) => {
        this.setTask(response.data.data);
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });


    this.setIsOpenTitleEditor(false);
    boardStore.getBoard(boardStore.board._id);
  }

  @action
  subscribeOnTheTask() {
    axios.patch(`/tasks/${this.task._id}`, { userId: isAuthentication.user._id })
        .then((response) => {
          this.checkIsSubscribe(response.data.data.users);
          this.setTask(response.data.data);
          boardStore.getBoard(boardStore.board._id);
        })
        .catch((error) => {
          console.warn(error);
        });
  }
}

const modalControllingTaskStore = new ModalControllingTaskStore();

export default modalControllingTaskStore;
export { ModalControllingTaskStore };

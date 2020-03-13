import { observable, computed, action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';
import isAuthentication from 'utils/auth';

class MarksStore {
  @observable isOpen = false;

  @action
  setIsOpen(value) {
    this.isOpen = value;
  }

  @action
  selectMark(mark, columnId, taskId) {
    boardStore.updateTaskMark(mark, columnId, taskId);

    axios.patch(`/tasks/masks/${taskId}`, { mark })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

const marksStore = new MarksStore();

export default marksStore;
export { MarksStore };

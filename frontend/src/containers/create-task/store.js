import { action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';

class CreateTaskStore {
  @action
  createTask(task, columnId, boardId) {
    axios.post(`/tasks/${columnId}`, { task })
      .then((response) => {
        boardStore.getBoard(boardId);
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

const createTaskStore = new CreateTaskStore();
export default createTaskStore;
export { CreateTaskStore };

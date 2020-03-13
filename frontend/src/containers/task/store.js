import { observable, action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';

class TaskStore {
  @observable isEdit = false;

  @observable title;

  @action
  deleteTask(taskId, columnId) {
    boardStore.deleteTaskInColumn(taskId, columnId);

    axios.delete(`/tasks/${taskId}`)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  @action
  editTask(taskId, columnId, task) {
    boardStore.editTask(taskId, columnId, task);

    axios.put(`/tasks/${taskId}`, { task })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

const taskStore = new TaskStore();
export default taskStore;
export { TaskStore };

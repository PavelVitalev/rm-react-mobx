import { action } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';

class ColumnStore {
  @action
  updateColumnTitle(id, title) {
    const updatedTitle = title.trim();

    boardStore.updateColumnById(id, updatedTitle);

    axios.put(`/columns/${id}`, { title: updatedTitle })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  @action
  deleteColumn(columnId) {
    boardStore.deleteColumn(columnId);

    axios.delete(`/columns/${columnId}`)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

const columnStore = new ColumnStore();
export default columnStore;
export { ColumnStore };

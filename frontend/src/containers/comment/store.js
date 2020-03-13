import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import boardStore from 'containers/board/store';

class CommentStore {
  @action
  deleteComment(commentId, taskId, columnId) {
    boardStore.deleteComment(commentId, taskId, columnId);

    axios.delete(`/comments/${commentId}`, { data: { taskId } })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.warn(error);
        });
  }
}

const commentStore = new CommentStore();
export default commentStore;
export { CommentStore };

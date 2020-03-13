import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import isAuthentication from '@utils/auth';
import boardStore from 'containers/board/store';

class CommentCreatorStore {
  defaultValue = 'Напишите комментарий...';

  @observable newComment = '';

  @action
  onChangeComment(comment) {
    this.newComment = comment;
  }

  @action
  sendComment(taskId, columnId) {
    const data = {
      comment: this.newComment.trim(),
      email: isAuthentication.user.email,
      name: isAuthentication.user.name
    };

    boardStore.addCommnet(data, taskId, columnId);

    return axios.post(`/comments/${taskId}`, data);
  }
}

const commentCreatorStore = new CommentCreatorStore();
export default commentCreatorStore;
export { CommentCreatorStore };

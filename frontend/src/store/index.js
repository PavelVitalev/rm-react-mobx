import isAuthentication from '@utils/auth';
import signinStore from 'containers/signin/store';
import signupStore from 'containers/signup/store';
import headerStore from 'containers/header/store';
import boardsStore from 'containers/boards/store';
import boardStore from 'containers/board/store';
import boardHeaderStore from 'containers/board-header/store';
import columnStore from 'containers/column/store';
import taskStore from 'containers/task/store';
import createBoardStore from 'containers/modal-create-board/store';
import createColumnStore from 'containers/create-column/store';
import createTaskStore from 'containers/create-task/store';
import modalControllingTaskStore from 'containers/modal-controlling-task/store';
import commentCreatorStore from 'containers/comment-creator/store';
import commentStore from 'containers/comment/store';
import marksStore from 'containers/marks/store';

const store = {
  isAuthentication,
  headerStore,
  signinStore,
  signupStore,
  boardsStore,
  boardStore,
  boardHeaderStore,
  columnStore,
  taskStore,
  createBoardStore,
  createColumnStore,
  createTaskStore,
  modalControllingTaskStore,
  commentCreatorStore,
  commentStore,
  marksStore
};

export default store;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

import CommentCreator from 'containers/comment-creator';

import BoardInput from 'components/board-input';
import Button from 'components/button';
import Comment from 'containers/comment';
import Marks from 'containers/marks';

@inject('modalControllingTaskStore')
@observer
class ModalControllingTask extends Component {
  constructor(props) {
    super(props);

    const { task, modalControllingTaskStore } = props;

    modalControllingTaskStore.setTask(task);

    modalControllingTaskStore.setTaskTitle(task.task);

    modalControllingTaskStore.checkIsSubscribe(task.users);

    modalControllingTaskStore.setIsOpenCommentCreator(false);

    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.addEventListener('keydown', null);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  getUserList = (users) => {
    if (!users.length) {
      return null;
    }

    return users.slice().reverse().map((user, index) => {
      if (index >= 5) {
        return null;
      }

      return (
        <span
          key={user._id}
          className="task-modal__subscribed-user"
          title={user.name}
        >
          {user.name[0]}
        </span>
      );
    });
  };

  render() {
    const { task, columnId, onClose, modalControllingTaskStore } = this.props;

    const users = this.getUserList(modalControllingTaskStore.task.users);

    return (
      <div className="task-modal-wrap">
        <div className="task-modal-overlay" onClick={() => onClose()} />
        <div className="task-modal">

          <div className="task-modal__row task-modal__header">
            <div className="task-modal__icon-wrap">
              <FontAwesomeIcon icon="file" />
            </div>

            {
              modalControllingTaskStore.isOpenTitleEditor ? (
                <BoardInput
                  className="task-modal__input"
                  type="text"
                  autoFocus
                  value={modalControllingTaskStore.taskTitle}
                  onChange={(event) => modalControllingTaskStore.setTaskTitle(event.target.value)}
                  onKeyDown={(event) => modalControllingTaskStore.keyDown(event)}
                  onBlur={() => modalControllingTaskStore.onSendEditTitle()}
                />
              ) : (
                <div
                    className="task-modal__title"
                    onClick={() => modalControllingTaskStore.setIsOpenTitleEditor(true)}
                >
                  { modalControllingTaskStore.taskTitle || modalControllingTaskStore.task.task }
                </div>
              )
            }
          </div>

          <div className="task-modal__row task-modal__task-info">
            <div className="task-modal__subscribed-list">
              {users}
            </div>
            <Button
                type="submit"
                className="btn--green task-modal__subscribe-btn"
                onClick={() => modalControllingTaskStore.subscribeOnTheTask()}
            >
              { modalControllingTaskStore.isSubscribe ? 'Отписаться' : 'Подписаться' }
            </Button>

            <div className="task-modal__marks">
              <Marks task={task} columnId={columnId} />
            </div>

          </div>

          <div className="task-modal__row task-modal__comments-wrap">
            <div className="task-modal__icon-wrap">
              <FontAwesomeIcon icon="comment" />
            </div>
            <div className="task-modal__comments">
              {
                !modalControllingTaskStore.isOpenCommentCreator ? (
                  <div
                      className="task-modal__comment-title"
                      onClick={() => modalControllingTaskStore.setIsOpenCommentCreator(true)}
                  >
                    {'Напишите комментарий...'}
                  </div>
                ) : (
                  <CommentCreator
                    taskId={task._id}
                    columnId={columnId}
                    onCloseEditor={() => modalControllingTaskStore.setIsOpenCommentCreator(false)}
                  />
                )
              }

            </div>
          </div>

          <div className="task-modal-close-wrap" onClick={() => onClose()}>
            <FontAwesomeIcon icon="times" />
          </div>

          <ul className="comments-list list-unstyled">
            {
              task.comments.map((comment) => (
                <Comment key={comment._id} columnId={columnId} taskId={task._id} comment={comment} />
              ))
            }
          </ul>

        </div>
      </div>
    );
  }
}

export default ModalControllingTask;

ModalControllingTask.propTypes = {
  modalControllingTaskStore: PropTypes.object,
  task: PropTypes.object,
  columnId: PropTypes.string,
  onClose: PropTypes.func
};

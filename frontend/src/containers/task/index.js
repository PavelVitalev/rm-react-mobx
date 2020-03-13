import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

import DeleteButton from 'components/delete-btn';
import Button from 'components/button';
import ModalControllingTask from 'containers/modal-controlling-task';

import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle
});

@inject('taskStore')
@observer
class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: props.task.task,
      isOpen: false,
      isOpenModal: false
    };
  }

  get task() {
    return this.state.task;
  }

  set task(value) {
    this.setState({ task: value });
  }

  get isOpen() {
    return this.state.isOpen;
  }

  set isOpen(value) {
    this.setState({ isOpen: value });
  }

  get isOpenModal() {
    return this.state.isOpenModal;
  }

  set isOpenModal(value) {
    this.setState({ isOpenModal: value });
  }

  sendEditTask = (event) => {
    event.preventDefault();

    const { task, columnId } = this.props;

    if (!this.task.length) {
      this.closeEditTask();
      return;
    }

    this.props.taskStore.editTask(task._id, columnId, this.task);
    this.isOpen = false;
  };

  enterKey = (event) => {
    if (event.keyCode === 27) {
      this.closeEditTask();
    }
  };

  openTaskModal = (event) => {
    event.preventDefault();
    this.isOpenModal = true;
  };

  closeEditTask() {
    this.isOpen = false;
    this.task = this.props.task.task;
  }

  render() {
    let marks;
    const { taskStore, task, columnId, index } = this.props;

// eslint-disable-next-line react/no-array-index-key
    if (task.marks && task.marks.length) {
      marks = task.marks.map((mark, i) => <span key={i} className={`task__mark task__mark--${mark}`} />);
    }

    return (
      this.isOpen ? (
        <Fragment>
          <div className="edit-task-form-overlay" onClick={() => this.closeEditTask()} />
          <form className="edit-task-form" onSubmit={this.sendEditTask}>
            <input
              className="edit-task-form__input"
              type="text"
              autoFocus
              value={this.task}
              onChange={(event) => {
                this.task = event.target.value;
              }}
              onKeyDown={(event) => {
                this.enterKey(event);
              }}
            />

            <div className="edit-task-form__btn-wrap">
              <Button
                type="submit"
                className="btn--green edit-task-form__btn"
              >
                {'Изменить'}
              </Button>

              <DeleteButton
                className="edit-task-form__icon"
                onClick={() => this.closeEditTask()}
              />
            </div>
          </form>
        </Fragment>
        )
        : (
          <Fragment>

            <Draggable
              key={task._id}
              draggableId={task._id}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <a className="task">
                    <div className="task-inner" onClick={this.openTaskModal}>
                      <div className="task__marks">{marks}</div>
                      <div className="task__title">
                        {task.task}
                        <div className="task__title-icon-wrap">
                          {
                            task.users && task.users.length ? (
                              <div className="task__title-icon">
                                <FontAwesomeIcon icon="eye" />
                              </div>
                            ) : null
                          }

                          {
                            task.comments && task.comments.length ? (
                              <div className="task__title-icon">
                                <FontAwesomeIcon icon="comment" />
                                { task.comments.length }
                              </div>
                            ) : null
                          }
                        </div>
                      </div>
                    </div>

                    <div className="task-icons-wrap">
                      <DeleteButton
                        className="task__delete-wrap"
                        onClick={() => taskStore.deleteTask(task._id, columnId)}
                      />
                      <div className="task__edit-wrap" onClick={() => { this.isOpen = true; }}>
                        <FontAwesomeIcon icon="pencil-alt" />
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </Draggable>
            {
              this.isOpenModal ? (
                <ModalControllingTask
                  onClose={() => { this.isOpenModal = false; }}
                  task={task}
                  columnId={columnId}
                />
              ) : null
            }
          </Fragment>
        )
    );
  }
}

export default Task;

Task.propTypes = {
  taskStore: PropTypes.object,
  task: PropTypes.object,
  columnId: PropTypes.string
};

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import './styles.scss';

import Button from 'components/button';
import DeleteButton from 'components/delete-btn';
import { BtnLoader } from 'components/loader';

@inject('createTaskStore', 'boardStore')
class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      newTaskTitle: ''
    };
  }

  set isOpen(value) {
    this.setState({ isOpen: value });
  }

  get isOpen() {
    return this.state.isOpen;
  }

  set taskTitle(value) {
    this.setState({ newTaskTitle: value });
  }

  get taskTitle() {
    return this.state.newTaskTitle;
  }

  createTask = (event) => {
    event.preventDefault();

    const { newTaskTitle } = this.state;
    const { columnId, createTaskStore, boardStore: { board } } = this.props;

    this.props.boardStore.addTask(columnId, newTaskTitle);
    createTaskStore.createTask(newTaskTitle, columnId, board._id);
    this.closeCreateTask();
  };

  enterKey = (event) => {
    if (event.keyCode === 27) {
      this.closeCreateTask();
    }
  };

  closeCreateTask() {
    this.taskTitle = '';
    this.isOpen = false;
  }

  render() {
    const { boardStore } = this.props;

    const overlayClass = classNames({
      'create-task-overlay': true,
      'open': this.isOpen
    });

    const taskClass = classNames({
      'create-task': true,
      'open': this.isOpen
    });

    return (
      <div className="create-task-wrap">
        <div className={overlayClass} onClick={() => this.closeCreateTask()} />

        <div className={taskClass}>
          {
            this.isOpen
              ? (
                <form className="create-task-form" onSubmit={this.createTask}>
                  <input
                    className="create-task-form__input"
                    type="text"
                    autoFocus
                    value={this.newTaskTitle}
                    onChange={(event) => {
                      this.taskTitle = event.target.value;
                    }}
                    onKeyDown={(event) => {
                      this.enterKey(event);
                    }}
                  />

                  <div className="create-task-form__btn-wrap">
                    <Button
                      type="submit"
                      className="btn--green create-task-form__btn"
                    >
                      {boardStore.isLoading ? <BtnLoader /> : 'Добавить'}
                    </Button>

                    <DeleteButton
                      className="create-task-form__icon"
                      onClick={() => this.closeCreateTask()}
                    />
                  </div>
                </form>
              )
              : (
                <div className="create-task__btn" onClick={() => { this.isOpen = true; }}>
                  <FontAwesomeIcon icon="plus" />
                  {'Добавить ещё одну карточку'}
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default CreateTask;

CreateTask.propTypes = {
  boardStore: PropTypes.object
};

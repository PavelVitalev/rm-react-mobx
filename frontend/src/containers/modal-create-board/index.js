import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

import Button from 'components/button';
import DeleteButton from 'components/delete-btn';

@inject('createBoardStore')
@observer
class ModalCreateBoard extends Component {
  render() {
    const { createBoardStore } = this.props;

    const btnClass = classNames({
      'board-modal__btn': true,
      'btn--color-dark': !createBoardStore.newBoardTitle.length,
      'disable': !createBoardStore.newBoardTitle.length
    });

    return (
      <div className="board-modal">
        <div className="board-modal-ovarlay" onClick={() => createBoardStore.toggleShowModalCreateBoard()} />
        <div className="board-modal-inner">

          <div className="board-modal__form">
            <form onSubmit={(event) => createBoardStore.createBoard(event)}>
              <input
                className="board-modal__input"
                type="text"
                autoFocus
                value={createBoardStore.newBoardTitle}
                onChange={(event) => createBoardStore.onTitleChange(event.target.value)}
                onKeyDown={(event) => createBoardStore.enterDown(event)}
              />

              <DeleteButton
                className="board-modal__icon-wrap"
                onClick={() => createBoardStore.toggleShowModalCreateBoard()}
              />
            </form>
          </div>

          <Button
            disabled={!createBoardStore.newBoardTitle.length}
            className={btnClass}
            type="button"
            onClick={(event) => createBoardStore.createBoard(event)}
          >
            {'Создать'}
          </Button>
        </div>

      </div>
    );
  }
}

export default ModalCreateBoard;

ModalCreateBoard.propTypes = {
  createBoardStore: PropTypes.object
};

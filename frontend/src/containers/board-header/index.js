import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import './styles.scss';

import BoardInput from 'components/board-input';
import Button from 'components/button';
import DeleteButton from 'components/delete-btn';
import UserBoardList from 'components/users-board-list';

@inject('boardHeaderStore', 'isAuthentication')
@observer
class BoardHeader extends Component {
  constructor(props) {
    super(props);

    props.boardHeaderStore.initTitle(props.title);
  }

  render() {
    const { isAuthentication, boardHeaderStore, users, id, history } = this.props;
    const isSubscribed = boardHeaderStore.isSubscribe(users);

    return (
      <div className="board-header">
        <div className="board-header__title-wrap">
          {
            boardHeaderStore.isEdit
              ? (
                <BoardInput
                  className="board-header__input"
                  type="text"
                  autoFocus
                  style={{ width: boardHeaderStore.getInputWidth() }}
                  value={boardHeaderStore.title}
                  onChange={(event) => boardHeaderStore.onTitleChange(event.target)}
                  onKeyDown={(event) => boardHeaderStore.enterDown(event)}
                  onBlur={(event) => boardHeaderStore.updateBoardTitle()}
                />
              )
              : (
                <div
                  className="board-header__title"
                  role="button"
                  onClick={() => boardHeaderStore.setIsEditTitle(true)}
                >
                  {boardHeaderStore.title}
                </div>
              )
          }

          <Button onClick={() => boardHeaderStore.attachUserToBoard(id)}>
            {isSubscribed ? 'Отписаться' : 'Подписаться'}
          </Button>

          <UserBoardList users={users} currentUser={isAuthentication.user} />

        </div>

        <DeleteButton className="board-header__icon" onClick={() => boardHeaderStore.deleteBoard(id, history)}/>

      </div>
    );
  }
}

export default BoardHeader;

BoardHeader.propTypes = {
  isAuthentication: PropTypes.bool,
  boardHeaderStore: PropTypes.bool,
  users: PropTypes.array,
  id: PropTypes.string,
  history: PropTypes.object
};

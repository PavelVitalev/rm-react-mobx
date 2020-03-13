import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

import DeleteButtom from 'components/delete-btn';

@inject('commentCreatorStore', 'boardStore')
@observer
class CommentCreator extends Component {
  keyDown(event) {
    if (event.nativeEvent.keyCode === 27) {
      this.closeEditor();
    }

    if (event.nativeEvent.keyCode === 13 && event.nativeEvent.ctrlKey) {
      this.sendComment();
    }
  }

  sendComment() {
    const { commentCreatorStore, boardStore, taskId, columnId } = this.props;
    const { newComment } = commentCreatorStore;
    if (newComment.trim && !newComment.trim().length) {
      this.closeEditor();
      return;
    }

    commentCreatorStore.sendComment(taskId, columnId)
      .then((response) => {
        boardStore.getBoard(boardStore.board._id);
        this.closeEditor();
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  closeEditor() {
    const { commentCreatorStore, onCloseEditor } = this.props;

    commentCreatorStore.onChangeComment('');

    onCloseEditor();
  }

  render() {
    const btnClassNames = classNames('btn comment-create__btn', {
      'enable btn--green': Boolean(this.props.commentCreatorStore.newComment.length)
    });

    const { commentCreatorStore, taskId } = this.props;

    return (
      <div className="comment-create">
        <div className="comment-create__editor">
          <textarea
              autoFocus
              className="comment-create__input"
              onChange={(event) => commentCreatorStore.onChangeComment(event.target.value)}
              onKeyDown={(event) => this.keyDown(event)}

          />
          <div className="comment-create__btn-group">
            <button
                type="button"
                className={btnClassNames}
                onClick={() => this.sendComment()}
            >
              {'Сохранить'}
            </button>
            <DeleteButtom onClick={() => this.closeEditor()} />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCreator;

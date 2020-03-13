import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import './styles.scss';
import CreateColumn from "../create-column";

@inject('commentStore')
@observer
class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      newComment: ''
    };
  }

  set isEdit(value) {
    this.setState({ isEdit: value });
  }

  get isEdit() {
    return this.state.isEdit;
  }

  set newComment(value) {
    this.setState({ newComment: value });
  }

  cancelEdit() {
    this.newComment = '';
    this.isEdit = false;
  }

// eslint-disable-next-line react/sort-comp
  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.cancelEdit();
    }
  }

  render() {
    const { comment, columnId, taskId, commentStore } = this.props;

    return (
      <li className="comments-list__item comment">
        <div className="comment__creator" title={comment.name}>{comment.name[0]}</div>

        <div className="comment__header">
          <span>{comment.name}</span>
        </div>

        <div className="comment__body">
          {
            this.isEdit ? (
              <input
                  autoFocus
                  className="comment-create__input"
                  value={comment.comment}
                  onBlur={() => this.cancelEdit()}
                  onChange={(event) => { this.newComment = event.target.value; }}
                  onKeyDown={(event) => this.onKeyDown(event)}
              />
            ) : (
              <span>{comment.comment}</span>
            )
          }
        </div>

        <div className="comment__bottom">
          <span onClick={() => commentStore.deleteComment(comment._id, taskId, columnId)}>Удалить</span>
        </div>
      </li>
    );
  }
}

export default Comment;

Comment.propTypes = {
  commentStore: PropTypes.object,
  comment: PropTypes.string,
  columnId: PropTypes.string,
  taskId: PropTypes.string,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import './styles.scss';

import BoardInput from 'components/board-input';
import DeleteButton from 'components/delete-btn';
import Tasks from 'components/tasks';

import CreateTask from 'containers/create-task';

@inject('columnStore')
class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.column.title,
      isEdit: false,
    };
  }

// eslint-disable-next-line react/sort-comp
  get title() {
    return this.state.title;
  }

  set title(value) {
    this.setState({ title: value });
  }

  get isEdit() {
    return this.state.isEdit;
  }

  set isEdit(value) {
    this.title = this.title.trim();
    this.setState({ isEdit: value });
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.title = this.props.column.title;

      this.isEdit = false;
    }

    if (event.keyCode === 13) {
      this.updateColumnTitle();
    }
  }

  updateColumnTitle() {
    this.isEdit = false;

    if (this.title.trim && !this.title.trim().length) {
      this.title = this.props.column.title;
      return;
    }

    if (this.title.trim && (this.title.trim() === this.props.column.title)) {
      return;
    }

    this.props.columnStore.updateColumnTitle(this.props.column._id, this.title);
  }

  render() {
    const { column, columnStore } = this.props;

    return (
      <div className="column-wrap">
        <div className="column">

          <div className="column-header">
            {
              !this.state.isEdit
                ? (
                  <div className="column-header__title-wrap" onClick={() => { this.isEdit = true; }}>
                    <h5 className="column-header__title">
                      {column.title}
                    </h5>
                  </div>
                )
                : (
                  <BoardInput
                    className="column-header__input"
                    type="text"
                    autoFocus
                    value={this.state.title}
                    onChange={(event) => { this.title = event.target.value; }}
                    onKeyDown={(event) => this.onKeyDown(event)}
                    onBlur={() => this.updateColumnTitle()}
                  />
                )
            }
            <DeleteButton onClick={() => columnStore.deleteColumn(column._id)} />

          </div>

          <div className="column-body">
            <Tasks column={column} />
          </div>

          <div className="column-footer">
            <CreateTask columnId={column._id} />
          </div>
        </div>
      </div>
    );
  }
}

export default Column;

Column.propTypes = {
  column: PropTypes.object,
  columnStore: PropTypes.object
};

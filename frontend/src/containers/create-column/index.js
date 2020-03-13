import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import './styles.scss';

import Button from 'components/button';
import DeleteButton from 'components/delete-btn';
import { BtnLoader } from 'components/loader';

@inject('createColumnStore')
@observer
class CreateColumn extends Component {
  render() {
    const { createColumnStore, boardId, isLoading } = this.props;

    const formClassNames = classNames('column-add-form', {
      'open': createColumnStore.isOpen
    });

    return (
      <div className="column-add-wrap">
        <div className="column-add">
          {
            createColumnStore.isOpen
              ? <div className="column-add-overlay" onClick={() => createColumnStore.closeCreateColumn()} />
              : null
          }
          <form
            className={formClassNames}
            onSubmit={(event) => createColumnStore.createColumn(event, this.props.boardId)}
          >
            <div className="column-add-form-btn" type="button" onClick={() => createColumnStore.setIsOpen(true)}>
              <FontAwesomeIcon icon="plus" />

              {'Добавьте еще одну колонку'}
            </div>

            <Fragment>
              <input
                className="column-add-form__input"
                type="text"
                autoFocus
                value={createColumnStore.newColumnTitle}
                onChange={(event) => createColumnStore.onTitleChange(event.target.value)}
                onKeyDown={(event) => createColumnStore.enterKey(event, boardId)}
              />

              <div className="column-add-form__btn-wrap">
                <Button
                  type="submit"
                  className="btn--green column-add-form__btn"
                >
                  {isLoading ? <BtnLoader /> : 'Добавить'}
                </Button>

                <DeleteButton className="column-add-form__icon" onClick={() => createColumnStore.closeCreateColumn()} />
              </div>
            </Fragment>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateColumn;

CreateColumn.propTypes = {
  createColumnStore: PropTypes.object,
  boardId: PropTypes.string,
  isLoading: PropTypes.bool
};

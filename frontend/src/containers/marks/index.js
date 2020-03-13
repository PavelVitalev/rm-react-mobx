import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DeleteButton from 'components/delete-btn';

import './styles.scss';

@inject('marksStore')
@observer
class Marks extends Component {
  render() {
    const marksNames = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];
    const { marksStore, task, columnId } = this.props;

    const marksTypes = marksNames
      .map((mark, i) => {
        return (
          <div
            key={i}
            className={`marks-item marks-item--${mark}`}
            onClick={() => marksStore.selectMark(mark, columnId, task._id)}
          >
            {task.marks.some((el) => el === mark) ? <FontAwesomeIcon icon="check" /> : null}
          </div>
        );
      });

    return (
      <div className="marks">
        <div className="marks__list-wrap">
          <ul className="marks__list list-unstyled">
            {
              /* eslint-disable react/no-array-index-key */
              task.marks.map((mark, i) => <li key={i} className={`marks-item marks-item--${mark}`} />)
            }
            <li className="marks-item marks-item--main" onClick={() => marksStore.setIsOpen(true)}>
              <FontAwesomeIcon icon="plus" />
            </li>
          </ul>
        </div>

        {
          marksStore.isOpen ? (
            <div className="marks-modal-wrap">
              <div className="marks-modal-overlay" onClick={() => marksStore.setIsOpen(false)} />
              <div className="marks-modal">
                <div className="marks-modal__header">
                  {'Метки'}
                  <DeleteButton onClick={() => marksStore.setIsOpen(false)} />
                </div>

                <div className="marks-modal__list">
                  {marksTypes}
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default Marks;

Marks.propTypes = {
  marksStore: PropTypes.object,
  task: PropTypes.object,
  columnId: PropTypes.string
};

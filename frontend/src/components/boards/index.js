import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import BoardElement from 'components/board-element';

const BoardsList = ({ boards, onClick }) => {
  return (
    <div className="main-boards-wrap">
      <div className="main-boards">
        <ul className="main-boards__list list-unstyled">
          {boards.map((board) => (
            <li className="main-boards__item" key={board._id}>
              <BoardElement board={board} />
            </li>
          ))}

          <li className="main-boards__item">
            <div onClick={onClick} className="main-boards__btn no-select">Создать доску</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardsList;

BoardsList.propTypes = {
  boards: PropTypes.array,
  onClick: PropTypes.func
};

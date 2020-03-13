import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

const BoardElement = ({ board }) => {
  return (
    <NavLink to={`/boards/${board._id}`} className="main-boards-link" id={board._id} href={board._id}>
      <span className="main-boards-title">{board.title}</span>
    </NavLink>
  );
};

export default BoardElement;

BoardElement.propTypes = {
  board: PropTypes.object,
};

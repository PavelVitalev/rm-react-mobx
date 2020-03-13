import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const getFirstLetterName = (user) => user.name[0].toUpperCase();

const UserBoardList = ({ users }) => {
  return (
    <ul className="board-users-list list-unstyled">
      {users.slice().reverse().map((user, i) => {
        if (i >= 10) {
          return null;
        }
        return (
          <li
            className="board-users-list__user"
            key={user._id}
            title={user.name}
          >
            {getFirstLetterName(user)}
          </li>
        );
      })}
    </ul>
  );
};

export default UserBoardList;

UserBoardList.propTypes = {
  users: PropTypes.array
};

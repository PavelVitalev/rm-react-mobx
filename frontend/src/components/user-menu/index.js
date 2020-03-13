import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const menu = [
  {
    path: '/signup',
    name: 'Sign Up'
  },
  {
    path: '/login',
    name: 'Log In'
  },
  {
    path: '/login',
    name: 'Log Out'
  },
  {
    path: '/',
    name: 'Home'
  }
];

const UserMenu = ({ signOut }) => (
  <div className="user-menu">
    <ul className="user-menu__list">

      {
        menu.map((link, i) => (
          <li className="user-menu__item no-select" key={i}>
            <NavLink
              className="user-menu__link"
              to={link.path}
              onClick={link.name === 'Log Out' ? signOut : null}
              exact
            >
              {link.name}
            </NavLink>
          </li>
        ))
      }

    </ul>
  </div>
);

export default UserMenu;

UserMenu.propTypes = {
  signOut: PropTypes.func
};

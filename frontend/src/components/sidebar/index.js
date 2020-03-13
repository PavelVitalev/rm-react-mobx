import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Route } from 'react-router-dom';

import './styles.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-list list-unstyled">

          <li className="sidebar-list__item">
            <NavLink strict to="/boards" className="sidebar-list__link">
              <FontAwesomeIcon icon="clipboard" />
              {'Доски'}
            </NavLink>
          </li>

          <li className="sidebar-list__item">
            <NavLink className="sidebar-list__link" strict to="/main">
              <FontAwesomeIcon icon="bolt" />
              {'Главная страница'}
            </NavLink>
          </li>

          <li className="sidebar-list__item">
            <NavLink className="sidebar-list__link" to="/board/:id">
              <FontAwesomeIcon icon="home" />
              {'123'}
            </NavLink>
          </li>

        </ul>
      </nav>

      <div className="sidebar-commands">
        <div className="sidebar-commands__btn">
          <span className="sidebar-command__title no-select">
            {'Команды'}
            <span className="sidebar-command__btn">
              <FontAwesomeIcon icon="plus" />
            </span>
          </span>
        </div>
        <ul className="sidebar-list list-unstyled">
          <li className="sidebar-list__item">
            <NavLink className="sidebar-list__link" to="/command/:id">
              <FontAwesomeIcon icon="users" />
              {'Команда 1'}
            </NavLink>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;

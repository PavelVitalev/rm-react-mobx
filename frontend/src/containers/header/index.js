import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

import UserMenu from 'components/user-menu';

import './styles.scss';

@inject('headerStore', 'signinStore')
@observer
class Header extends Component {
  render() {
    const { headerStore, signinStore } = this.props;

    return (
      <div className="header">
        <div className="header__left">
          <Link className="btn btn--width" to="/">
            <FontAwesomeIcon icon="home" />
          </Link>

          <Link className="btn btn__text" to="/boards">
            <FontAwesomeIcon icon="clipboard" />
            {'Доски'}
          </Link>

          <div className="header__input-wrap">
            <input className="header__input" />
            <span className="header__input-icon">
              <FontAwesomeIcon icon="search" />
            </span>
          </div>

        </div>
        <div className="flex-spacer" />

        <div className="header__logo">
          <a className="header__logo__link" href="/">
            <span className="header__logo__img" />
          </a>
        </div>

        <div className="header__right">

          <button type="button" className="btn btn--width">
            <FontAwesomeIcon icon="plus" />
            <i className="fa fa-plus" />
          </button>

          <button type="button" className="btn btn--width">
            <FontAwesomeIcon icon="bell" />
          </button>

          <button type="button" className="btn btn--width">
            <FontAwesomeIcon icon="info" />
            <i className="fa fa-info" />
          </button>

          <div role="button" className="user" onClick={headerStore.openMenu}>
            <div className="user__img" />
          </div>
          {headerStore.isOpenMenu && <UserMenu signOut={() => signinStore.signout()} />}
        </div>
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  headerStore: PropTypes.object,
  signinStore: PropTypes.object
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import './styles.scss';

import Sidebar from 'components/sidebar';
import { Loader } from 'components/loader';
import Boards from 'containers/boards';
import PrivateRoute from 'containers/private-route/index';

@inject('isAuthentication')
@observer
class MainPage extends Component {
  render() {
    // location and history for sidebar which doesn't exist
    const { location, history, isAuthentication: { isPending } } = this.props;

    return (
      !isPending
        ? (
          <div className="container-wrap container-wrap--pt">
            <div className="row-wrap">
              {/* <Sidebar history={history} location={location} /> */}
              <PrivateRoute path="/" component={Boards} />
            </div>
          </div>
        )
        : <Loader />
    );
  }
}

export default MainPage;

MainPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  isAuthentication: PropTypes.object,
};

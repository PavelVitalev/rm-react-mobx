import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { getToken } from '@utils/auth/index';
import { Loader } from 'components/loader';

@inject('isAuthentication')
@observer
class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isAuthentication: { isAuth, isPending }, ...rest } = this.props;

    if (isPending) {
      return (<Loader />);
    }

    return (
      isAuth && getToken()
        ? <Route {...rest} render={(props) => (<Component {...props} />)} />
        : <Redirect to="/login" />
    );
  }
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isAuthentication: PropTypes.object,
};

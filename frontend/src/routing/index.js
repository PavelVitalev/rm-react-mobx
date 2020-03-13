import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from 'containers/header';
import MainPage from 'containers/main';
import SignIn from 'containers/signin';
import SignUp from 'containers/signup';
import Board from 'containers/board';

import PrivateRoute from 'containers/private-route/index';

class AdminRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/boards" />} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" render={() => <div>logout</div>} />
          <Route exact path="/boards" render={(routerProps) => <MainPage {...routerProps} />} />

          <PrivateRoute path="/boards/:id" component={Board} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default AdminRouter;

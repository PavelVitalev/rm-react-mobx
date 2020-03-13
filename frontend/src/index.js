import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import './assets/css/main.scss';
import './assets/icons';

import './utils/interceptors/auth';

import store from './store';

import App from './app';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

configure({ enforceActions: 'observed' });

store.isAuthentication.checkIsAuth();

store.routing = routingStore;

ReactDOM.render(
  <Provider {...store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

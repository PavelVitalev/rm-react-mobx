import React, { Fragment } from 'react';
import DevTools from 'mobx-react-devtools';
import AdminRouter from 'routing';

const App = () => (
  <Fragment>
    {process.env.NODE_ENV === 'development' ? <DevTools position={{ top: 0, right: 200 }} /> : ''}
    <AdminRouter />
  </Fragment>
);

export default App;

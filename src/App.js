import React from 'react';
import { Router } from 'react-static';
// eslint-disable-next-line
import Routes from 'react-static-routes';
import { Provider } from 'react-redux';

import './App.scss';
import store from './connectors/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="main">
        <Routes />
      </div>
    </Router>
  </Provider>
);

export default App;

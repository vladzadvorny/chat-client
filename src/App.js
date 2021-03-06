import React, { Fragment } from 'react';
import { Router } from 'react-static';
// eslint-disable-next-line
import Routes from 'react-static-routes';
import { Provider } from 'react-redux';

import './App.scss';
import store from './connectors/store';

import Header from './components/Header';
import Sounds from './components/Sounds';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <div className="main">
          <Routes />
        </div>
        <Sounds />
      </Fragment>
    </Router>
  </Provider>
);

export default App;

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import websocket from './websocket';

const middlewares = [websocket];

const store = createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

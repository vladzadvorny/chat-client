import { combineReducers } from 'redux';

import menu from './menu';
import ws from './ws';
import app from './app';

export default combineReducers({ menu, ws, app });

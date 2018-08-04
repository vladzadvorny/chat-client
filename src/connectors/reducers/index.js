import { combineReducers } from 'redux';

import params from './params';
import ws from './ws';

export default combineReducers({ params, ws });

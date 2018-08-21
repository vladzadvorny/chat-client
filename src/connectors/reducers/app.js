import { START_CHAT, STOP_CHAT } from '../actions';

const initialState = {
  startChat: false // or chat
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_CHAT:
      return Object.assign({}, state, {
        startChat: true
      });

    case STOP_CHAT:
      return Object.assign({}, state, {
        startChat: false
      });

    default:
      return state;
  }
};

import { MESSAGE, TYPING, START, LOOKING, FINISH } from '../../utils/wsTypes';
import { TYPING_STOP, RESET } from '../actions';

const initialState = {
  messages: [],
  typing: false,
  connect: false,
  start: false,
  counts: [0, 0],
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'WEBSOCKET:OPEN':
      return Object.assign({}, state, {
        connect: true
      });

    case 'WEBSOCKET:CLOSE':
      return Object.assign({}, state, {
        connect: false
      });

    case 'WEBSOCKET:ERROR':
      return Object.assign({}, state, {
        error: true
      });

    case MESSAGE:
      return Object.assign({}, state, {
        messages: [action.payload, ...state.messages],
        typing: false
      });

    case TYPING:
      return Object.assign({}, state, {
        typing: true,
        messages: state.messages.map(message => {
          if (message.my && message.unread) {
            return Object.assign({}, message, {
              unread: false
            });
          }

          return message;
        })
      });

    case TYPING_STOP:
      return Object.assign({}, state, {
        typing: false
      });

    case START:
      return Object.assign({}, state, {
        start: true
      });

    case FINISH:
      return Object.assign({}, state, {
        start: false
      });

    case LOOKING:
      return Object.assign({}, state, {
        counts: action.payload
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};

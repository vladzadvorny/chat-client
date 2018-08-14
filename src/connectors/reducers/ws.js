import { MESSAGE, TYPING, START, LOOKING } from '../../utils/wsTypes';
import { TYPING_STOP, RESET } from '../actions';

function types(state, payload) {
  const data = JSON.parse(payload.data);

  // message
  if (data.type === MESSAGE) {
    return Object.assign({}, state, {
      messages: [data, ...state.messages],
      typing: false
    });
  }

  // typing
  if (data.type === TYPING) {
    // console.log('typing');

    const messages = state.messages.map(message => {
      if (message.my && message.unread) {
        return Object.assign({}, message, {
          unread: false
        });
      }

      return message;
    });

    return Object.assign({}, state, {
      typing: true,
      messages
    });
  }

  // start
  if (data.type === START) {
    return Object.assign({}, state, {
      start: true
    });
  }

  // looking
  if (data.type === LOOKING) {
    return Object.assign({}, state, {
      counts: data.counts
    });
  }

  return state;
}

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

    case 'WEBSOCKET:MESSAGE':
      return types(state, action.payload);
    // return [...state, data];

    case TYPING_STOP:
      return Object.assign({}, state, {
        typing: false
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};

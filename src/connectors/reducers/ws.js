import { MESSAGE, TYPING } from '../../utils/wsTypes';
import { TYPING_STOP } from '../actions';

function types(state, payload) {
  const data = JSON.parse(payload.data);
  if (data.type === MESSAGE) {
    return Object.assign({}, state, {
      messages: [data, ...state.messages],
      typing: false
    });
  }

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

  return state;
}

const initialState = {
  messages: [],
  typing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'WEBSOCKET:MESSAGE':
      return types(state, action.payload);
    // return [...state, data];

    case TYPING_STOP:
      return Object.assign({}, state, {
        typing: false
      });

    default:
      return state;
  }
};

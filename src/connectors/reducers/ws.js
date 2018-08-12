import { MESSAGE } from '../../utils/wsTypes';

function types(state, payload) {
  const data = JSON.parse(payload.data);
  if (data.type === MESSAGE) {
    return Object.assign({}, state, {
      messages: [data, ...state.messages]
    });
  }

  return state;
}

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'WEBSOCKET:MESSAGE':
      return types(state, action.payload);
    // return [...state, data];

    default:
      return state;
  }
};

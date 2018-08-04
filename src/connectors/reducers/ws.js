const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'WEBSOCKET:MESSAGE':
      return Object.assign({}, state, {
        messages: [JSON.parse(action.payload.data), ...state.messages]
      });
    // return [...state, data];

    default:
      return state;
  }
};

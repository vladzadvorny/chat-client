let websocket;

export default store => next => action => {
  switch (action.type) {
    // User request to connect
    case 'WEBSOCKET:CONNECT':
      // Configure the object
      websocket = new WebSocket(action.payload.url);

      // Attach the callbacks
      websocket.onopen = () => store.dispatch({ type: 'WEBSOCKET:OPEN' });
      websocket.onclose = event =>
        store.dispatch({ type: 'WEBSOCKET:CLOSE', payload: event });
      websocket.onmessage = event =>
        store.dispatch({ type: 'WEBSOCKET:MESSAGE', payload: event });
      websocket.onerror = event =>
        store.dispatch({ type: 'WEBSOCKET:ERROR', payload: event });

      break;

    // User request to send a message
    case 'WEBSOCKET:SEND':
      websocket.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case 'WEBSOCKET:DISCONNECT':
      websocket.close();
      break;

    default:
      // We don't really need the default but ...
      break;
  }

  return next(action);
};

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Messages from '../components/Messages';
import Looking from '../components/Looking';

import './Chat.scss';
import { RESET, STOP_CHAT } from '../connectors/actions';
import { LOOKING } from '../utils/wsTypes';
import { wsUrl } from '../utils/config';

class Chat extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { dispatch } = this.props;
    dispatch({ type: RESET });

    this.websocket = new WebSocket(wsUrl);
    const ws = this.websocket;

    ws.onopen = () => dispatch({ type: 'WEBSOCKET:OPEN' });
    ws.onerror = event => dispatch({ type: 'WEBSOCKET:ERROR', payload: event });
    ws.onmessage = event => {
      const { type, payload } = JSON.parse(event.data);
      dispatch({ type, payload });
    };
    ws.onclose = () => dispatch({ type: 'WEBSOCKET:CLOSE' });
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { connect, error, menu, finish } = this.props;
    if (nextProps.connect && !connect) {
      console.log('connect');

      this.websocket.send(
        JSON.stringify({
          type: LOOKING,
          payload: menu
        })
      );
    }

    if (nextProps.finish && !finish) {
      console.log('finish');
      // eslint-disable-next-line no-shadow
      const { dispatch } = this.props;
      if (
        // eslint-disable-next-line
        window.alert('Собеседник отключился :(') === undefined
      ) {
        dispatch({ type: STOP_CHAT });
      }
    }

    if (!nextProps.connect && connect) {
      console.log('disconnect');
      // eslint-disable-next-line no-shadow
      const { dispatch } = this.props;
      if (
        // eslint-disable-next-line
        window.alert('Разрыв соединения.') === undefined
      )
        dispatch({ type: STOP_CHAT });
    }

    if (nextProps.error && !error) {
      console.log('error');
      // eslint-disable-next-line no-shadow
      const { dispatch } = this.props;
      if (
        // eslint-disable-next-line
        window.alert(
          'Нет связи с сервером, либо другая ошибка. Попробуй ещё раз.'
        ) === undefined
      )
        dispatch({ type: STOP_CHAT });
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const { dispatch } = this.props;
    this.websocket.close();
    dispatch({ type: 'WEBSOCKET:CLOSE' });
  }

  render() {
    const { start } = this.props;

    return (
      <div className="chat container">
        {start ? <Messages websocket={this.websocket} /> : <Looking />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  connect: state.ws.connect,
  start: state.ws.start,
  finish: state.ws.finish,
  error: state.ws.error,
  menu: state.menu
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

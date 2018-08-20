import React, { Component } from 'react';
import { connect } from 'react-redux';

import Messages from '../components/Messages';
import Looking from '../components/Looking';

import './Chat.scss';
import { reset } from '../connectors/actions';
import { LOOKING } from '../utils/wsTypes';
import { wsUrl } from '../utils/config';

class Chat extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { dispatch, reset } = this.props;
    reset();

    this.websocket = new WebSocket(wsUrl);
    const ws = this.websocket;

    ws.onopen = () => dispatch({ type: 'WEBSOCKET:OPEN' });
    ws.onerror = event => dispatch({ type: 'WEBSOCKET:ERROR', payload: event });
    ws.onmessage = event => {
      const { type, payload } = JSON.parse(event.data);
      dispatch({ type, payload });
    };
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { connect, error, params } = this.props;
    if (nextProps.connect && !connect) {
      console.log('connect');

      this.websocket.send(
        JSON.stringify({
          type: LOOKING,
          payload: params
        })
      );
    }

    if (!nextProps.connect && connect) {
      console.log('disconnect');
      // if (
      //   // eslint-disable-next-line
      //   window.alert('Связь оборвалась, либо собеседник отключился.') ===
      //   undefined
      // )
      //   history.push('/');
    }

    if (nextProps.error && !error) {
      console.log('error');
      // if (
      //   // eslint-disable-next-line
      //   window.alert(
      //     'Нет связи с сервером, либо другая ошибка. Попробуй ещё раз.'
      //   ) === undefined
      // )
      //   history.push('/');
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

// eslint-disable-next-line
const mapStateToProps = state => ({
  connect: state.ws.connect,
  start: state.ws.start,
  error: state.ws.error,
  params: state.params
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  reset
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

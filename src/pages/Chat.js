import React, { Component } from 'react';
import { Head, withRouter } from 'react-static';
import { connect } from 'react-redux';

import { siteName, wsUrl } from '../utils/config';
import './Chat.scss';
import { reset } from '../connectors/actions';
import { LOOKING } from '../utils/wsTypes';

import Messages from '../components/Messages';
import Looking from '../components/Looking';

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
    const { connect, history, error } = this.props;
    if (nextProps.connect && !connect) {
      console.log('connect');

      this.websocket.send(
        JSON.stringify({
          type: LOOKING
        })
      );
    }
    if (!nextProps.connect && connect) {
      console.log('disconnect');
      if (
        // eslint-disable-next-line
        window.alert('Связь оборвалась, либо собеседник отключился.') ===
        undefined
      )
        history.push('/');
    }
    if (nextProps.error && !error) {
      console.log('error');
      if (
        // eslint-disable-next-line
        window.alert(
          'Нет связи с сервером, либо другая ошибка. Попробуй ещё раз.'
        ) === undefined
      )
        history.push('/');
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
        <Head>
          <title>{`Чат с собеседником — ${siteName}`}</title>
        </Head>
        {start ? <Messages websocket={this.websocket} /> : <Looking />}
      </div>
    );
  }
}

// eslint-disable-next-line
const mapStateToProps = state => ({
  connect: state.ws.connect,
  start: state.ws.start,
  error: state.ws.error
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  reset
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));

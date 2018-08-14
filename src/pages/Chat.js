import React, { Component } from 'react';
import { Head, withRouter } from 'react-static';
import { connect } from 'react-redux';

import { siteName, wsUrl } from '../utils/config';
import './Chat.scss';
import { wsConnect, wsDisconnect, wsSend, reset } from '../connectors/actions';
import { LOOKING } from '../utils/wsTypes';

import Messages from '../components/Messages';
import Looking from '../components/Looking';

class Chat extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { wsConnect, reset } = this.props;
    reset();
    wsConnect(wsUrl);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { connect, wsSend, history, error } = this.props;

    if (nextProps.connect && !connect) {
      console.log('connect');
      wsSend({
        type: LOOKING
      });
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
    const { wsDisconnect } = this.props;
    wsDisconnect();
  }

  render() {
    const { start } = this.props;

    return (
      <div className="chat container">
        <Head>
          <title>{`Чат с собеседником — ${siteName}`}</title>
        </Head>
        {start ? <Messages /> : <Looking />}
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

const mapDispatchToProps = {
  wsConnect,
  wsSend,
  wsDisconnect,
  reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));

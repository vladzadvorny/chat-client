import React, { Component } from 'react';
import { Head } from 'react-static';
import { connect } from 'react-redux';

import { siteName, wsUrl } from '../utils/config';
import './Chat.scss';
import { wsConnect, wsDisconnect, wsSend } from '../connectors/actions';
import { LOOKING } from '../utils/wsTypes';

import Messages from '../components/Messages';
import Looking from '../components/Looking';

class Chat extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { wsConnect } = this.props;
    wsConnect(wsUrl);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { connect, wsSend } = this.props;

    if (nextProps.connect && !connect) {
      console.log('connect');
      wsSend({
        type: LOOKING
      });
    } else {
      console.log('disconnect');
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
  start: state.ws.start
});

const mapDispatchToProps = {
  wsConnect,
  wsSend,
  wsDisconnect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

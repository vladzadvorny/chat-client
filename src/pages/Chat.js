import React, { Component } from 'react';
import { connect } from 'react-redux';

import { wsConnect, wsSend, wsDisconnect } from '../connectors/actions';
import { wsUrl } from '../utils/config';
import './Chat.scss';

class Chat extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { wsConnect } = this.props;
    wsConnect(wsUrl);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const { wsDisconnect } = this.props;
    wsDisconnect();
  }

  render() {
    return (
      <div className="chat container">
        <h1>Chat</h1>
        <style jsx>
          {`
            body {
              padding-top: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  params: state.params
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

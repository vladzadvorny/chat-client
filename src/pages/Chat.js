import React, { Component } from 'react';
import { Head } from 'react-static';
import { connect } from 'react-redux';

import { siteName } from '../utils/config';
import './Chat.scss';

// import Messages from '../components/Messages';
import Looking from '../components/Looking';

class Chat extends Component {
  render() {
    return (
      <div className="chat container">
        <Head>
          <title>{`Чат с собеседником — ${siteName}`}</title>
        </Head>
        {/* <Messages /> */}
        <Looking />
      </div>
    );
  }
}

// eslint-disable-next-line
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

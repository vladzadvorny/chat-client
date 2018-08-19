import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Head } from 'react-static';

import './Looking.scss';
import { siteName } from '../utils/config';

class Looking extends Component {
  render() {
    const { counts } = this.props;

    return (
      <div className="looking">
        <Head>
          <title>{`Поиск собеседника — ${siteName}`}</title>
        </Head>
        <div className="box">
          <h2>Поиск собеседника</h2>
          <div className="loader" />
          <div className="stats">
            <span>Сейчас общаются: {counts[0]}</span>
            <span>В поиске: {counts[1]}</span>
          </div>
        </div>
        <style>
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

// eslint-disable-next-line
const mapStateToProps = state => ({
  counts: state.ws.counts
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Looking);

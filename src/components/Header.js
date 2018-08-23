import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-static';

import './Header.scss';
import { siteName, siteUrl } from '../utils/config';
import { stopChat, toggleMute } from '../connectors/actions';

class Header extends Component {
  render() {
    /* eslint-disable no-shadow */
    const {
      location: { pathname },
      start,
      mute,
      stopChatAction,
      toggleMuteAction
    } = this.props;
    /* eslint-enable */

    return (
      <header className="header">
        <div className="container">
          <div className="left">
            {start && (
              <i
                className="fas fa-sign-out-alt"
                onClick={() => {
                  if (
                    // eslint-disable-next-line
                    window.confirm('Вы точно хотите покинуть чат?')
                  )
                    stopChatAction();
                }}
                role="presentation"
              />
            )}
          </div>
          {pathname === '/' ? (
            <h1 className="logo">{siteName}</h1>
          ) : (
            <Link className="logo" to={siteUrl}>
              {siteName}
            </Link>
          )}
          <div className="right">
            {!mute ? (
              <i
                className="fas fa-volume-up"
                role="presentation"
                onClick={() => toggleMuteAction()}
              />
            ) : (
              <i
                className="fas fa-volume-off"
                role="presentation"
                onClick={() => toggleMuteAction()}
              />
            )}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  start: state.ws.start,
  mute: state.app.mute
});

const mapDispatchToProps = {
  stopChatAction: stopChat,
  toggleMuteAction: toggleMute
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

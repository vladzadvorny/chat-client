import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-static';

import './Header.scss';
import { siteName, siteUrl } from '../utils/config';
import { stopChat } from '../connectors/actions';

class Header extends Component {
  render() {
    /* eslint-disable no-shadow */
    const {
      location: { pathname },
      startChat,
      stopChatAction
    } = this.props;
    /* eslint-enable */

    return (
      <header className="header">
        <div className="container">
          <div className="left">
            {startChat && (
              <i
                className="fas fa-sign-out-alt"
                onClick={() => {
                  if (
                    // eslint-disable-next-line
                    window.alert('Вы точно хотите покинуть чат?') === undefined
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
          <div className="right" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  startChat: state.app.startChat
});

const mapDispatchToProps = {
  stopChatAction: stopChat
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

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
      start,
      stopChatAction
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
          <div className="right" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  start: state.ws.start
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

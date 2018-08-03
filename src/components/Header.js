import React, { Component } from 'react';
import { Link, withRouter } from 'react-static';

import './Header.scss';
import { siteName, siteUrl } from '../utils/config';

class Header extends Component {
  render() {
    const {
      location: { pathname }
    } = this.props;
    console.log(pathname === '/');

    return (
      <header className="header">
        <div className="container">
          {pathname === '/' ? (
            <h1 className="logo">{siteName}</h1>
          ) : (
            <Link className="logo" to={siteUrl}>
              {siteName}
            </Link>
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);

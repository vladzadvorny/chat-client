import React, { Component } from 'react';
import { Link, withRouter } from 'react-static';

import './Header.scss';

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
            <h1 className="logo">Анонимный чат</h1>
          ) : (
            <Link className="logo" to="/">
              Анонимный чат
            </Link>
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);

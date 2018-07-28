import React, { Component } from 'react';

import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="logo">Анонимный чат</h1>
        </div>
      </header>
    );
  }
}

export default Header;

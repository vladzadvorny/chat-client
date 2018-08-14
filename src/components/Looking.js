import React, { Component } from 'react';

import './Looking.scss';

class Looking extends Component {
  render() {
    return (
      <div className="looking">
        <div className="box">
          <h2>Поиск собеседника</h2>
          <div className="loader" />
          <div className="stats">
            <span>Сейчас общаются: 225</span>
            <span>В поиске: 22</span>
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

export default Looking;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-static';

import './Home.scss';
import {
  changeSex,
  changeAge,
  changeFindSex,
  changeFindAge
} from '../connectors/actions';

class Home extends Component {
  render() {
    /* eslint-disable no-shadow */
    const {
      params: { sex, age, findSex, findAge },
      changeSex,
      changeAge,
      changeFindSex,
      changeFindAge
    } = this.props;
    /* eslint-enable */

    return (
      <div className="home">
        <div className="block1">
          <div className="enter-box">
            <div className="enter-form">
              <div className="column">
                {/* sex */}
                <div className="item">
                  <h3>Who are you?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={sex === 'male' ? 'active' : ''}
                      onClick={() => changeSex('male')}
                    >
                      I'm a boy
                    </li>
                    <li
                      role="presentation"
                      className={sex === 'female' ? 'active' : ''}
                      onClick={() => changeSex('female')}
                    >
                      I'm a girl
                    </li>
                  </ul>
                </div>

                {/* age */}
                <div className="item">
                  <h3>How old are you?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={age === '<17' ? 'active' : ''}
                      onClick={() => changeAge('<17')}
                    >
                      Less than 17 years old
                    </li>
                    <li
                      role="presentation"
                      className={age === '18-21' ? 'active' : ''}
                      onClick={() => changeAge('18-21')}
                    >
                      From 18 to 21 years old
                    </li>
                    <li
                      role="presentation"
                      className={age === '22-25' ? 'active' : ''}
                      onClick={() => changeAge('22-25')}
                    >
                      From 22 to 25 years old
                    </li>
                    <li
                      role="presentation"
                      className={age === '26-35' ? 'active' : ''}
                      onClick={() => changeAge('26-35')}
                    >
                      From 26 to 35 years old
                    </li>
                    <li
                      role="presentation"
                      className={age === '>36' ? 'active' : ''}
                      onClick={() => changeAge('>36')}
                    >
                      Оver 36 years old
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column">
                {/* findSex */}
                <div className="item">
                  <h3>Who do you want to talk to?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={findSex === 'male' ? 'active' : ''}
                      onClick={() => changeFindSex('male')}
                    >
                      With a boy
                    </li>
                    <li
                      role="presentation"
                      className={findSex === 'female' ? 'active' : ''}
                      onClick={() => changeFindSex('female')}
                    >
                      With a girl
                    </li>
                    <li
                      role="presentation"
                      className={findSex === 'unknown' ? 'active' : ''}
                      onClick={() => changeFindSex('unknown')}
                    >
                      No difference
                    </li>
                  </ul>
                </div>

                {/* findAge */}
                <div className="item">
                  <h3>How old?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={findAge.indexOf('<17') !== -1 ? 'active' : ''}
                      onClick={() => changeFindAge('<17')}
                    >
                      Less than 17 years old
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('18-21') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('18-21')}
                    >
                      From 18 to 21 years old
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('22-25') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('22-25')}
                    >
                      From 22 to 25 years old
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('26-35') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('26-35')}
                    >
                      From 26 to 35 years old
                    </li>
                    <li
                      role="presentation"
                      className={findAge.indexOf('>36') !== -1 ? 'active' : ''}
                      onClick={() => changeFindAge('>36')}
                    >
                      Оver 36 years old
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('unknown') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('unknown')}
                    >
                      No difference
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button type="button" className="enter-button">
              Find!
            </button>
          </div>
        </div>
        <div className="block2">block2</div>
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

const mapStateToProps = state => ({
  params: state.params
});

const mapDispatchToProps = {
  changeSex,
  changeAge,
  changeFindSex,
  changeFindAge
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);

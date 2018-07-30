import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Head, withRouteData, Link } from 'react-static';

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
      changeFindAge,
      posts
    } = this.props;
    /* eslint-enable */

    return (
      <div className="home">
        <Head>
          <title>Анонимный чат</title>
        </Head>
        <div className="block1">
          <div className="enter-box">
            <div className="enter-form">
              <div className="column">
                {/* sex */}
                <div className="item">
                  <h3>Кто ты?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={sex === 'male' ? 'active' : ''}
                      onClick={() => changeSex('male')}
                    >
                      Парень
                    </li>
                    <li
                      role="presentation"
                      className={sex === 'female' ? 'active' : ''}
                      onClick={() => changeSex('female')}
                    >
                      Девушка
                    </li>
                  </ul>
                </div>

                {/* age */}
                <div className="item">
                  <h3>Сколько тебе лет?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={age === '<18' ? 'active' : ''}
                      onClick={() => changeAge('<18')}
                    >
                      Менее 18
                    </li>
                    <li
                      role="presentation"
                      className={age === '18-21' ? 'active' : ''}
                      onClick={() => changeAge('18-21')}
                    >
                      От 18 до 21
                    </li>
                    <li
                      role="presentation"
                      className={age === '22-25' ? 'active' : ''}
                      onClick={() => changeAge('22-25')}
                    >
                      От 22 до 25
                    </li>
                    <li
                      role="presentation"
                      className={age === '26-35' ? 'active' : ''}
                      onClick={() => changeAge('26-35')}
                    >
                      От 26 до 35
                    </li>
                    <li
                      role="presentation"
                      className={age === '=>36' ? 'active' : ''}
                      onClick={() => changeAge('=>36')}
                    >
                      36 и старше
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column">
                {/* findSex */}
                <div className="item">
                  <h3>С кем ты хочешь поговорить?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={findSex === 'male' ? 'active' : ''}
                      onClick={() => changeFindSex('male')}
                    >
                      С парнем
                    </li>
                    <li
                      role="presentation"
                      className={findSex === 'female' ? 'active' : ''}
                      onClick={() => changeFindSex('female')}
                    >
                      С девушкой
                    </li>
                    <li
                      role="presentation"
                      className={findSex === 'unknown' ? 'active' : ''}
                      onClick={() => changeFindSex('unknown')}
                    >
                      Без разницы
                    </li>
                  </ul>
                </div>

                {/* findAge */}
                <div className="item">
                  <h3>Какого возраста?</h3>
                  <ul>
                    <li
                      role="presentation"
                      className={findAge.indexOf('<18') !== -1 ? 'active' : ''}
                      onClick={() => changeFindAge('<18')}
                    >
                      Менее 18
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('18-21') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('18-21')}
                    >
                      От 18 до 21
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('22-25') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('22-25')}
                    >
                      От 22 до 25
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('26-35') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('26-35')}
                    >
                      От 26 до 35
                    </li>
                    <li
                      role="presentation"
                      className={findAge.indexOf('>=36') !== -1 ? 'active' : ''}
                      onClick={() => changeFindAge('>=36')}
                    >
                      36 и старше
                    </li>
                    <li
                      role="presentation"
                      className={
                        findAge.indexOf('unknown') !== -1 ? 'active' : ''
                      }
                      onClick={() => changeFindAge('unknown')}
                    >
                      Без разницы
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
        <div className="block2">
          <ul>
            {posts.map(post => (
              <li key={post.slug}>
                <Link to={`/${post.slug}/`}>{post.title}</Link>
              </li>
            ))}
          </ul>
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
  withRouteData(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  )
);

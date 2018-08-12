import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Head, withRouteData, Link } from 'react-static';
import {
  VKShareButton,
  VKIcon,
  VKShareCount,
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  OKShareButton,
  OKIcon,
  OKShareCount
} from 'react-share';

import './Home.scss';
import {
  changeSex,
  changeAge,
  changeFindSex,
  changeFindAge
} from '../connectors/actions';
import { siteUrl, siteName } from '../utils/config';
import google from '../../public/img/google-play-badge.png';

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
          <meta
            name="description"
            content="Русскоязыный анонимный чат для онлайн общения двух взрослых или подростков, с отправкой фотографий, с выбором пола и возраста."
          />
          <title>{siteName}</title>
        </Head>
        <div className="block-top">
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
        <div className="block-bottom">
          <div className="container">
            <div className="column">
              <a href="/" className="google-play">
                <img src={google} alt="Google Play" />
              </a>
              <div className="share-buttons">
                <div className="network">
                  <VKShareButton
                    url={siteUrl}
                    title={siteName}
                    description="Лучший анонимный чат для знакомства и общения! С возможностью отправки фотографий."
                    // image={`${String(window.location)}/${exampleImage}`}
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button"
                  >
                    <VKIcon size={32} round />
                  </VKShareButton>

                  <VKShareCount url={siteUrl} className="share-count" />
                </div>
                <div className="network">
                  <FacebookShareButton
                    url={siteUrl}
                    quote={siteName}
                    className="share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <FacebookShareCount url={siteUrl} className="share-count">
                    {count => count}
                  </FacebookShareCount>
                </div>

                <div className="network">
                  <OKShareButton
                    url={siteUrl}
                    // image={`${String(window.location)}/${exampleImage}`}
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button"
                  >
                    <OKIcon size={32} round />
                  </OKShareButton>

                  <OKShareCount url={siteUrl} className="share-count" />
                </div>
              </div>
              <p>
                Анонимный чат для онлайн общения двоих взрослых или подростков,
                без регистрации и с возможностью отправки фото и голосовых
                сообщений. Здесь можно познакомиться с парнем или девушкой,
                найти друга и поговорить о жизни. Существует возможность выбора
                пола и собеседника для пошлых тем :)
              </p>

              <p>
                <a href={`${siteUrl}/about`}>О проекте</a>
              </p>

              <p>
                © <a href={siteUrl}>Анонимный-чат.рф</a>, 2018.
              </p>
            </div>
            <div className="column">
              <span className="h3">Блог</span>
              <ul>
                {posts.slice(0, 5).map(post => (
                  <li key={post.slug}>
                    <Link to={`/блог/${post.slug}/`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
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

import React, { Component } from 'react';
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
import { Link } from 'react-static';

import google from '../../public/img/google-play-badge.png';
import { siteUrl, siteName } from '../utils/config';
import './Footer.scss';

class Footer extends Component {
  render() {
    const { posts } = this.props;

    return (
      <footer className="footer">
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
              сообщений. Здесь можно познакомиться с парнем или девушкой, найти
              друга и поговорить о жизни. Существует возможность выбора пола и
              собеседника для пошлых тем :)
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
                  <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

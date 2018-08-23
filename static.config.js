import React, { Component } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { reloadRoutes } from 'react-static/node';
import jdown from 'jdown';
import chokidar from 'chokidar';
import { slugify } from 'transliter';

import { siteUrl as siteRoot, siteName as title } from './src/utils/config';

chokidar.watch('content').on('all', () => reloadRoutes());

export default {
  siteRoot,
  getSiteData: () => ({ title }),
  // eslint-disable-next-line
  getRoutes: async () => {
    const { posts, about } = await jdown('content');

    const routes = [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          posts: posts.map(post =>
            Object.assign({}, post, { slug: slugify(post.title) })
          )
        }),
        children: posts.map(post => ({
          path: `/blog/${slugify(post.title)}`,
          component: 'src/pages/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        path: '/about',
        component: 'src/pages/About',
        getData: () => ({
          about
        })
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ];

    return routes;
  },

  webpack: (config, { defaultLoaders, stage }) => {
    let loaders = [];

    if (stage === 'dev') {
      loaders = [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ];
    } else {
      loaders = [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: stage === 'prod',
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: { includePaths: ['src/'] }
        }
      ];

      // Don't extract css to file during node build process
      if (stage !== 'node') {
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: false,
              hmr: false
            }
          },
          use: loaders
        });
      }
    }
    // eslint-disable-next-line
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: loaders
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];
    return config;
  },
  Document: class CustomHtml extends Component {
    render() {
      const {
        Html,
        Head,
        Body,
        children
        // renderMeta
      } = this.props;
      const script1 = `(function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter49940956 = new Ya.Metrika2({
                    id:49940956,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/tag.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks2");`;

      return (
        <Html lang="ru">
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="robots" content="all" />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
              integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
              crossOrigin="anonymous"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="yandex-verification" content="612027c27b2d9cc3" />
          </Head>
          <Body>
            {children}

            <script dangerouslySetInnerHTML={{ __html: script1 }} />
            <noscript>
              <div>
                <img
                  src="https://mc.yandex.ru/watch/49940956"
                  style={{ position: 'absolute', left: '-9999' }}
                  alt=""
                />
              </div>
            </noscript>
          </Body>
        </Html>
      );
    }
  }
};

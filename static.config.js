import React, { Component } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { reloadRoutes } from 'react-static/node';
import jdown from 'jdown';
import chokidar from 'chokidar';

chokidar.watch('content').on('all', () => reloadRoutes());

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
  // eslint-disable-next-line
  getRoutes: async () => {
    const { posts, about } = await jdown('content');

    const routes = [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/блог/${post.slug}`,
          component: 'src/pages/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        path: '/chat',
        component: 'src/pages/Chat'
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
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  }
};

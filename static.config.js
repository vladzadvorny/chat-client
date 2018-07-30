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
    const { posts } = await jdown('content');

    const routes = [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/${post.slug}`,
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
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  }
};

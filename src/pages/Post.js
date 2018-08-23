import React, { Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
// eslint-disable-next-line import/no-extraneous-dependencies
import convert from 'htmr';

import Footer from '../components/Footer';

import './Post.scss';
import { siteName } from '../utils/config';

export default withRouteData(({ post, posts }) => (
  <Fragment>
    <div className="post container">
      <Head>
        <meta name="description" content={post.description} />
        <title>{`${post.title} — ${siteName}`}</title>
      </Head>
      <h2>{post.title}</h2>
      {convert(post.contents)}
    </div>
    <Footer posts={posts} />
  </Fragment>
));

import React from 'react';
import { withRouteData, Head } from 'react-static';
// eslint-disable-next-line import/no-extraneous-dependencies
import convert from 'htmr';

import './Post.scss';
import { siteName } from '../utils/config';

export default withRouteData(({ post }) => (
  <div className="post container">
    <Head>
      <meta name="description" content={post.description} />
      <title>{`${post.title} — ${siteName}`}</title>
    </Head>
    <h2>{post.title}</h2>
    {convert(post.contents)}
  </div>
));

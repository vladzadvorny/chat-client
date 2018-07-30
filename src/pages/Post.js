import React from 'react';
import { withRouteData } from 'react-static';
// eslint-disable-next-line import/no-extraneous-dependencies
import convert from 'htmr';

import './Post.scss';

export default withRouteData(({ post }) => (
  <div className="post container">
    <h2>{post.title}</h2>
    {convert(post.contents)}
  </div>
));

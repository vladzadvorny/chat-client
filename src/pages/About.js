import React, { Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
// eslint-disable-next-line import/no-extraneous-dependencies
import convert from 'htmr';

import './About.scss';
import { siteName } from '../utils/config';

export default withRouteData(({ about }) => (
  <Fragment>
    <Head>
      <meta name="description" content={about.description} />
      <title>{`${about.title} — ${siteName}`}</title>
    </Head>
    <div className="about container">{convert(about.contents)}</div>
  </Fragment>
));

import React from 'react';
import { withRouteData } from 'react-static';
// eslint-disable-next-line import/no-extraneous-dependencies
import convert from 'htmr';

import './About.scss';

export default withRouteData(({ about }) => (
  <div className="about container">{convert(about.contents)}</div>
));

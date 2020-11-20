import * as React from 'react';

import './HeadingWrapper.scss';

interface HeadingWrapperProps {
  heading: string;
  id: string;
}

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- required for keyboard scrolling */
const HeadingWrapper = (props: HeadingWrapperProps): JSX.Element => (
  <div className="auth-heading-wrapper" tabIndex={-1}>
    <h2 id={props.id}>{props.heading}</h2>
    <a href="#page-header">Return to top</a>
  </div>
);

export { HeadingWrapper };

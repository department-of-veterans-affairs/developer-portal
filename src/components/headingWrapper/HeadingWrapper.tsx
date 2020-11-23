import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { onHashAnchorClick } from '../../utils/clickHandlers';

import './HeadingWrapper.scss';

interface HeadingWrapperProps {
  heading: string;
  id: string;
}

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- required for keyboard scrolling */
const HeadingWrapper = (props: HeadingWrapperProps): JSX.Element => (
  <div className="auth-heading-wrapper">
    <h2 id={props.id} tabIndex={-1}>{props.heading}</h2>
    <HashLink
      to="#page-header"
      className="page-link"
      onClick={onHashAnchorClick}
    >
      Return to top
    </HashLink>
  </div>
);

export { HeadingWrapper };

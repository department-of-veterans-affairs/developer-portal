import * as React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_HEADER_ID } from '../../types/constants';

import './SectionHeaderWrapper.scss';

interface SectionHeaderWrapperProps {
  heading: string;
  id: string;
}

const SectionHeaderWrapper = (props: SectionHeaderWrapperProps): JSX.Element => (
  <div className="section-heading-wrapper">
    <h2 id={props.id} tabIndex={-1}>
      {props.heading}
    </h2>
    <Link to={`#${PAGE_HEADER_ID}`} className="page-link">
      <i className="fas fa-arrow-up" /> Return to top
    </Link>
  </div>
);

export { SectionHeaderWrapper };

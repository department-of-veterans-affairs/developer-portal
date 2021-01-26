import React, { FC } from 'react';
import classNames from 'classnames';
import { PAGE_HEADER_ID } from '../../types/constants';
import { SideNav } from '../sideNav/SideNav';

interface ContentWithNavProps {
  nav: React.ReactNode;
  content: React.ReactNode;
  navAriaLabel: string;
  contentAriaLabelledBy?: string;
  className?: string;
}

const ContentWithNav: FC<ContentWithNavProps> = ({ nav, content, navAriaLabel, contentAriaLabelledBy, className }) => (
  <div className={classNames('vads-u-padding-y--5', className)}>
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <SideNav ariaLabel={navAriaLabel}>{nav}</SideNav>
        <section
          aria-labelledby={contentAriaLabelledBy ?? PAGE_HEADER_ID}
          className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}
        >
          {content}
        </section>
      </div>
    </div>
  </div>
);

export { ContentWithNav };

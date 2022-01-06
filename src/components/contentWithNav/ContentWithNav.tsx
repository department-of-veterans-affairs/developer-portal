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
  fullWidth?: boolean;
}

const ContentWithNav: FC<ContentWithNavProps> = ({ nav, content, navAriaLabel, contentAriaLabelledBy, className, fullWidth }) => (
  <div className={classNames('vads-u-padding-y--5', className)}>
    <div
      className={classNames(
      { 'vads-l-grid-container--full vads-u-padding-x--2 medium-screen:vads-u-padding-x--4': fullWidth },
      { 'vads-l-grid-container': !fullWidth }
    )}
    >
      <div className="vads-l-row">
        <SideNav ariaLabel={navAriaLabel} containerClassName={classNames({ 'large-screen:vads-l-col--2': fullWidth })}>{nav}</SideNav>
        <section
          aria-labelledby={contentAriaLabelledBy ?? PAGE_HEADER_ID}
          className={classNames(
            'vads-l-col--12',
            'medium-screen:vads-l-col--9',
            { 'large-screen:vads-l-col--10': fullWidth },
            'medium-screen:vads-u-padding-left--5',
          )}
        >
          {content}
        </section>
      </div>
    </div>
  </div>
);

export { ContentWithNav };

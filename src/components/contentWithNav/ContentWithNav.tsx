import React, { FC } from 'react';
import classNames from 'classnames';
import { PAGE_HEADER_ID } from '../../types/constants';

interface ContentWithNavProps {
  nav: React.ReactNode;
  content: React.ReactNode;
  navAriaLabel: string;
  className?: string;
}

const ContentWithNav: FC<ContentWithNavProps> = ({ nav, content, navAriaLabel, className }) => (
  <div className={classNames('vads-u-padding-y--5', className)}>
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <nav
          aria-label={navAriaLabel}
          className={classNames(
            'vads-l-col--12',
            'vads-u-padding-right--5',
            'medium-screen:vads-l-col--4',
          )}
        >
          {nav}
        </nav>
        <section
          aria-labelledby={PAGE_HEADER_ID}
          className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}
        >
          {content}
        </section>
      </div>
    </div>
  </div>
);

export { ContentWithNav };

import React, { FC } from 'react';
import classNames from 'classnames';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({ left, right }) => (
  <div className={classNames('vads-u-padding-y--5')}>
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        {left}
        <section aria-label="content" className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
          {right}
        </section>
      </div>
    </div>
  </div>
);

export default TwoColumnLayout;

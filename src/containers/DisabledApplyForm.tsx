import classNames from 'classnames';
import * as React from 'react';

export default function DisabledApplyForm() {
  return (
    <section className={classNames('vads-l-grid-container', 'vads-u-margin-y--5')}>
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'small-desktop-screen:vads-l-col--8')}>
          <h1>New API key signups have been temporarily disabled</h1>
          <p>
            We are currently making changes which require us to take our signup form offline. This will
            not take more than a few hours, so please check back later. We apologize for the
            inconvenience.
          </p>
        </div>
      </div>
    </section>
  );
}

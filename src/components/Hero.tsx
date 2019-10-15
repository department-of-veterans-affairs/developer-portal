import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/hero-logo.png';

export default function Hero() {
  const heroClasses = classNames(
    'vads-u-background-color--primary-darkest',
    'vads-u-padding-y--5',
    'vads-u-padding-x--0',
    'va-api-hero',
  );

  return (
    <section role="region" aria-label="Page Hero" className={heroClasses}>
      <div className={classNames("vads-l-grid-container", "vads-u-margin-x--auto")}>
        <div className="vads-l-row">
          <div className={classNames("small-desktop-screen:vads-l-col--7", "medium-screen:vads-l-col--12", "va-api-margin-y--auto")}>
            <div className="vads-u-max-width--100">
              <h1 className="vads-u-color--white">A Veteran-centered API platform for securely accessing VA data.</h1>
              <Link id="hero-request-key" to="/apply" className="usa-button">Request an API Key</Link>
            </div>
          </div>
          <div className={classNames("small-desktop-screen:vads-l-col--4", "medium-screen:vads-l-col--12", "vads-u-margin-x--auto", "va-api-margin-y--auto")}>
            <img src={logo} alt="Department of Veterans Affairs" />
          </div>
        </div>
      </div>
    </section>
  );
}

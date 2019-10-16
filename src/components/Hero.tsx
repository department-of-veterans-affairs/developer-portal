import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/hero-logo.png';

export default function Hero() {
  const heroClasses = classNames(
    'vads-u-background-color--primary-darkest',
    'vads-u-padding-y--5',
    'vads-u-padding-x--0',
  );

  const containerClasses = classNames(
    "vads-u-display--flex",
    "small-desktop-screen:vads-u-flex-direction--row",
    "vads-u-flex-direction--column-reverse",
    "vads-l-grid-container",
    "vads-u-margin-x--auto",
  );

  return (
    <section role="region" aria-label="Page Hero" className={heroClasses}>
      <div className={containerClasses}>
        <div className={classNames("", "va-api-margin-y--auto")}>
          <div className="vads-u-max-width--100">
            <h1 className="vads-u-color--white">A Veteran-centered API platform for securely accessing VA data.</h1>
            <Link id="hero-request-key" to="/apply" className="usa-button vads-u-width--full medium-screen:vads-u-width--auto">Request an API Key</Link>
          </div>
        </div>
        <div className={classNames("", "vads-u-margin-x--auto", "va-api-margin-y--auto")}>
          <img src={logo} alt="Department of Veterans Affairs" />
        </div>
      </div>
    </section>
  );
}

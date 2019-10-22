import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/hero-logo.svg';

export default function Hero() {
  return (
    <section role="region" aria-label="Page Hero" className={classNames(
      'vads-u-background-color--primary-darkest',
      'vads-u-padding-y--5',
      'vads-u-padding-x--0',
    )}>
      <div className={classNames(
        "vads-u-display--flex",
        "small-desktop-screen:vads-u-flex-direction--row",
        "vads-u-flex-direction--column-reverse",
        "vads-l-grid-container",
        "vads-u-margin-x--auto",
      )}>
        <div className={classNames("va-api-u-margin-y--auto")}>
          <div className="vads-u-max-width--100">
            <h1 className={classNames("vads-u-color--white", "vads-u-font-size--h2", "small-desktop-screen:vads-u-font-size--h1")}>A Veteran-centered API platform for securely accessing VA data.</h1>
            <Link id="hero-request-key" to="/apply" className="usa-button vads-u-width--full medium-screen:vads-u-width--auto">Request an API Key</Link>
          </div>
        </div>
        <div className={classNames("small-desktop-screen:vads-u-width--auto", "va-api-u-width--200", "vads-u-margin-x--auto", "va-api-u-margin-y--auto")}>
          <img src={logo} alt="" role="presentation" />
        </div>
      </div>
    </section>
  );
}

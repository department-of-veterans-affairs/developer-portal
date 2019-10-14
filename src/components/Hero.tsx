import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/hero-logo.png';
import './Hero.scss';

export default function Hero() {
  return (
    <section role="region" aria-label="Page Hero" className="va-api-hero">
      <div className={classNames("vads-l-grid-container", "vads-u-margin-x--auto")}>
        <div className="vads-l-row">
          <div className={classNames("small-desktop-screen:vads-l-col--7", "medium-screen:vads-l-col--12", "va-api-margin-y--auto")}>
            <div className="va-api-hero-callout">
              <h1>A Veteran-centered API platform for securely accessing VA data.</h1>
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

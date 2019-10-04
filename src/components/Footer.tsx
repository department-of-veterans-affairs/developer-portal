import * as React from 'react';

import './Footer.scss';

import logo from '../assets/lighthouseVaLogo.png';

export default function Footer() {
    return (
        <footer className="va-api-footer" role="contentinfo">
          <div className="usa-grid">
            <div className="vads-u-padding-y--1p5 medium-screen:vads-u-padding-y--2p5 usa-width-one-third">
              <a href="https://www.va.gov">
                <img src={logo} alt="Department of Veterans Affairs" />
              </a>
            </div>
            <div className="va-api-footer-links usa-width-two-thirds">
              <ul>
                <li>
                  <a href="/terms-of-service">Terms of Service</a>
                </li>
                <li>
                  <a href="https://github.com/department-of-veterans-affairs/VA-Micropurchase-Repo">Micro-consulting</a>
                </li>
                <li>
                  <a href="https://www.section508.va.gov/">Accessibility</a>
                </li>
                <li>
                  <a href="https://www.va.gov/webpolicylinks.asp">Web Policies</a>
                </li>
                <li>
                  <a href="https://www.va.gov/privacy/">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
    );
}

import classNames from 'classnames';
import * as React from 'react';

import './Footer.scss';

import logo from '../assets/lighthouseVaLogo.png';

export default function Footer() {
  return (
    <footer className="va-api-footer" role="contentinfo">
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <div className={classNames(
            'vads-u-margin-y--1p5', 
            'medium-screen:vads-u-margin-y--2p5', 
            'vads-l-col--12',
            'medium-screen:vads-l-col--4',
          )}>
            <a href="https://www.va.gov">
              <img src={logo} alt="Department of Veterans Affairs" />
            </a>
          </div>
          <div className={classNames(
            'vads-u-margin-y--1',
            'medium-screen:vads-u-margin-y--4',
            'vads-l-col--12',
            'medium-screen:vads-l-col--8',
            'va-api-footer-links', 
          )}>
            <ul className={classNames(
              'vads-u-padding-left--0',
              'vads-u-margin--0',
              'vads-l-row',
              'vads-u-flex-direction--column',
              'vads-u-justify-content--flex-start',
              'medium-screen:vads-u-flex-direction--row',
              'medium-screen:vads-u-justify-content--flex-end',
            )}>
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
      </div>
    </footer>
  );
}

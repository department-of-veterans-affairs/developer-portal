import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

import { SUPPORT_CONTACT_PATH } from '../../paths';
import logo from '../../assets/lighthouseVaLogo.png';

const footerLinkStyles = classNames('vads-u-font-size--sm', 'vads-u-color--white');
const listItemStyles = classNames(
  'medium-screen:vads-u-padding-left--4',
  'medium-screen:vads-u-margin-bottom--0',
);

const Footer: React.FunctionComponent = (): JSX.Element => (
  <footer
    role="contentinfo"
    className={classNames(
      'vads-u-background-color--primary-darkest',
      'vads-u-color--white',
      'vads-u-width--full',
    )}
  >
    <div
      className={classNames(
        'vads-u-display--flex',
        'vads-u-margin-x--2',
        'vads-u-flex-direction--column',
        'medium-screen:vads-u-margin-x--4',
        'medium-screen:vads-u-flex-direction--row'
      )}
    >
      <div
        className={classNames(
          'vads-u-margin-y--1p5',
          'vads-u-flex--auto',
          'medium-screen:vads-u-margin-y--2p5',
        )}
      >
        <a href="https://www.va.gov">
          <img src={logo} className="va-api-footer-logo" alt="Department of Veterans Affairs" />
        </a>
      </div>
      <div
        className={classNames(
          'vads-u-margin-y--1',
          'vads-u-flex--1',
          'medium-screen:vads-u-margin-y--4',
        )}
      >
        <ul
          className={classNames(
            'va-api-footer-link-list',
            'vads-u-padding-left--0',
            'vads-u-margin--0',
            'vads-l-row',
            'vads-u-flex-direction--column',
            'vads-u-justify-content--flex-start',
            'medium-screen:vads-u-flex-direction--row',
            'medium-screen:vads-u-justify-content--flex-end',
          )}
        >
          <li className={listItemStyles}>
            <Link to={SUPPORT_CONTACT_PATH} className={footerLinkStyles}>
              Contact Us
            </Link>
          </li>
          <li className={listItemStyles}>
            <Link to="/terms-of-service" className={footerLinkStyles}>
              Terms of Service
            </Link>
          </li>
          <li className={listItemStyles}>
            <a href="https://www.section508.va.gov/" className={footerLinkStyles}>
              Accessibility
            </a>
          </li>
          <li className={listItemStyles}>
            <a href="https://www.va.gov/webpolicylinks.asp" className={footerLinkStyles}>
              Web Policies
            </a>
          </li>
          <li className={listItemStyles}>
            <a href="https://www.va.gov/privacy/" className={footerLinkStyles}>
              Privacy
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {};
export { Footer };

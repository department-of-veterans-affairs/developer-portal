import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

import { SUPPORT_CONTACT_PATH, TERMS_OF_SERVICE_PATH } from '../../types/constants/paths';
import logo from '../../assets/lighthouseVaLogo.png';

const footerStyles = classNames(
  'vads-u-background-color--primary-darkest',
  'vads-u-color--white',
  'vads-u-width--full',
  'vads-u-display--flex',
  'vads-u-border-top--5px',
  'vads-u-border-color--gold',
  'vads-u-flex-direction--column',
  'vads-u-padding-x--2',
  'medium-screen:vads-u-flex-direction--row',
  'medium-screen:vads-u-padding-x--4',
);
const vaLinkStyles = classNames(
  'vads-u-margin-y--1p5',
  'vads-u-flex--auto',
  'medium-screen:vads-u-margin-y--2p5',
);
const footerListStyles = classNames(
  'va-api-footer-link-list',
  'vads-u-padding-left--0',
  'vads-u-margin--0',
  'vads-u-margin-y--1',
  'vads-u-flex--1',
  'vads-u-display--flex',
  'vads-u-flex-direction--column',
  'vads-u-justify-content--flex-start',
  'medium-screen:vads-u-flex-direction--row',
  'medium-screen:vads-u-justify-content--flex-end',
  'medium-screen:vads-u-flex-wrap--wrap',
  'medium-screen:vads-u-margin-y--4',
);
const footerLinkStyles = classNames('vads-u-font-size--sm', 'vads-u-color--white');
const listItemStyles = classNames(
  'medium-screen:vads-u-padding-left--4',
  'medium-screen:vads-u-margin-bottom--0',
);

const Footer: React.FunctionComponent = (): JSX.Element => (
  <footer role="contentinfo" className={footerStyles}>
    <a href="https://www.va.gov" className={vaLinkStyles}>
      <img src={logo} className="va-api-footer-logo" alt="Department of Veterans Affairs" />
    </a>
    <ul className={footerListStyles}>
      <li className={listItemStyles}>
        <Link to={SUPPORT_CONTACT_PATH} className={footerLinkStyles}>
          Contact Us
        </Link>
      </li>
      <li className={listItemStyles}>
        <Link to={TERMS_OF_SERVICE_PATH} className={footerLinkStyles}>
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
  </footer>
);

Footer.propTypes = {};
export { Footer };

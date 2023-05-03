import classNames from 'classnames';
import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { AppVersion } from '../../components';

import './Footer.scss';

import { PUBLISHING_PATH, SUPPORT_PATH, TERMS_OF_SERVICE_PATH } from '../../types/constants/paths';
import logo from '../../assets/lighthouseVaLogo.png';

const footerStyles = classNames(
  'vads-u-background-color--primary-darkest',
  'vads-u-color--white',
  'vads-u-width--full',
  'vads-u-display--flex',
  'vads-u-flex-direction--column',
  'vads-u-padding-x--2',
  'medium-screen:vads-u-flex-direction--row',
  'medium-screen:vads-u-padding-x--4',
);
const vaLinkStyles = classNames(
  'vads-u-margin-y--1p5',
  'vads-u-flex--auto',
  'medium-screen:vads-u-margin-y--2p5',
  'va-api-footer-logo'
);
const footerListStyles = classNames(
  'va-api-footer-link-list',
  'vads-u-padding-left--0',
  'vads-u-margin--0',
  'vads-u-margin-y--1',
  // 'vads-u-flex--1',
  // 'vads-u-display--flex',
  // 'vads-u-flex-direction--column',
  'vads-u-justify-content--flex-start',
  'medium-screen:vads-u-flex-direction--row',
  'medium-screen:vads-u-flex-wrap--wrap',
  'medium-screen:vads-u-margin-y--4',
);
const footerLinkStyles = classNames('vads-u-font-size--sm', 'vads-u-color--white');
const listItemStyles = classNames(
  'medium-screen:vads-u-margin-bottom--0',
);

const separatorStyles = classNames(
  'vads-u-display--none',
  'medium-screen:vads-u-padding-x--1p5',
  'medium-screen:vads-u-display--inline'
  );

const Footer: React.FunctionComponent = (): JSX.Element => (
  <footer role="contentinfo" className={footerStyles}>
    <ul className={footerListStyles}>
      <li className={listItemStyles}>
        <NavHashLink to={PUBLISHING_PATH} className={footerLinkStyles}>
          API Publishing
        </NavHashLink>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <a href="https://www.section508.va.gov/" className={footerLinkStyles}>
          Accessibility
        </a>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <NavHashLink to={SUPPORT_PATH} className={footerLinkStyles}>
          Support
        </NavHashLink>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <a href="https://www.va.gov/webpolicylinks.asp" className={footerLinkStyles}>
          Web Policies
        </a>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <NavHashLink to={TERMS_OF_SERVICE_PATH} className={footerLinkStyles}>
          Terms of Service
        </NavHashLink>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <a href="https://www.va.gov/privacy/" className={footerLinkStyles}>
          Privacy
        </a>
      </li>
      <span className={separatorStyles}>|</span>
      <li className={listItemStyles}>
        <a href="https://www.va.gov/vulnerability-disclosure-policy/" className={footerLinkStyles}>
          Vulnerability Disclosure Policy
        </a>
      </li>
    </ul>
    <a href="https://www.va.gov" className={vaLinkStyles}>
      <img src={logo} className="va-api-footer-logo" alt="Department of Veterans Affairs" />
    </a>
    <AppVersion />
  </footer>
);

Footer.propTypes = {};
export { Footer };

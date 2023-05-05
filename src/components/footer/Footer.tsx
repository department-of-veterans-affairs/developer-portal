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
  'vads-u-flex--1',
  'vads-u-display--flex',
  'vads-u-flex-direction--row',
  'vads-u-flex-wrap--wrap',
  'vads-u-justify-content--space-between',
  'medium-screen:vads-u-flex-direction--column',
  'medium-screen:vads-u-justify-content--flex-start',
  'medium-screen:vads-u-flex-direction--row',
  'medium-screen:vads-u-flex-wrap--wrap',
  'medium-screen:vads-u-margin-y--4',
);
const footerLinkStyles = classNames('vads-u-font-size--sm', 'vads-u-color--white');
const listItemStyles = classNames(
  'va-api-footer-list-item',
  'medium-screen:vads-u-margin-bottom--0',
);

const Footer: React.FunctionComponent = (): JSX.Element => (
  <footer role="contentinfo" className={footerStyles}>
    <ul className={footerListStyles}>
      <li id="footer-publishing-link" className={listItemStyles}>
        <NavHashLink to={PUBLISHING_PATH} className={footerLinkStyles}>
          API Publishing
        </NavHashLink>
      </li>
      <li id="footer-accessibility-link" className={listItemStyles}>
        <a href="https://www.section508.va.gov/" className={footerLinkStyles}>
          Accessibility
        </a>
      </li>
      <li id="footer-support-link" className={listItemStyles}>
        <NavHashLink to={SUPPORT_PATH} className={footerLinkStyles}>
          Support
        </NavHashLink>
      </li>
      <li id="footer-web-policies-link" className={listItemStyles}>
        <a href="https://www.va.gov/webpolicylinks.asp" className={footerLinkStyles}>
          Web Policies
        </a>
      </li>
      <li id="footer-tos-link" className={listItemStyles}>
        <NavHashLink to={TERMS_OF_SERVICE_PATH} className={footerLinkStyles}>
          Terms of Service
        </NavHashLink>
      </li>
      <li id="footer-privacy-link" className={listItemStyles}>
        <a href="https://www.va.gov/privacy/" className={footerLinkStyles}>
          Privacy
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

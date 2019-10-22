import classNames from 'classnames';
import * as React from 'react';

import { faComments, faDeaf, faMobileAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import CrisisPanelInfo from './CrisisPanelInfo';

import vclLogo from '../../assets/vcl-logo.png';

export default function VeteransCrisisLinePanel() {
  return (
    <div className={classNames('va-crisis-panel', 'va-api-crisis-panel', 'vads-u-max-width--none', 'vads-u-color--base')}>
      <div className="va-crisis-panel-body">
        <h3 className={classNames('vads-u-display--flex', 'vads-u-align-items--flex-start')}>
          <img src={vclLogo} alt="Veterans Crisis Line logo" aria-label="Veterans Crisis Line logo"
            className={classNames('va-api-crisis-line-logo', 'vads-u-margin-top--1', 'vads-u-margin-right--1p5')} />
          <span>We're here anytime, day or night - 24/7</span>
        </h3>
        <p>
          If you are a Veteran in crisis or concerned about one, connect with our caring,
          qualified responders for confidential help. Many of them are Veterans themselves.
        </p>
        <ul className={classNames(
          'va-api-crisis-panel-list',
          'vads-u-border-top--1px',
          'vads-u-border-color--gray-lighter',
          'vads-u-text-align--left',
        )}>
          <CrisisPanelInfo target="tel:18002738255" icon={faPhone} id="first-panel-info">
            Call <strong>1-800-273-8255 and press 1</strong>
          </CrisisPanelInfo>
          <CrisisPanelInfo target={"sms:838255"} icon={faMobileAlt}>Text <strong>838255</strong></CrisisPanelInfo>
          <CrisisPanelInfo icon={faComments} target="https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat">
            Start a confidential chat
          </CrisisPanelInfo>
          <CrisisPanelInfo target="tel:18007994889" icon={faDeaf}>
            Call TTY if you have hearing loss <strong>1-800-799-4889</strong>
          </CrisisPanelInfo>
        </ul>
        <p>
          Get more resources at &nbsp;
          <a href="https://www.veteranscrisisline.net/">VeteransCrisisLine.net</a>.
        </p>
      </div>
    </div>
  );
}
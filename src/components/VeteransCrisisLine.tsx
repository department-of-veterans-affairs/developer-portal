import * as React from 'react';

import { faComments, faDeaf, faMobileAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import './VeteransCrisisLine.scss';

import vclLogo from '../assets/vcl-logo.png';

interface IVeteransCrisisLineProps {
  visible: boolean;
  closeHandler: (event?: {}) => void; 
}

export default class VeteransCrisisLine extends React.Component<IVeteransCrisisLineProps, {}> {
  private firstListItemLink = React.createRef<HTMLAnchorElement>();

  public componentDidMount() {
    document.addEventListener("keydown", this.escKeyHandler, false);
  }

  public componentDidUpdate() {
    if (this.props.visible && this.firstListItemLink.current) {
      this.firstListItemLink.current.focus();
    }
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.escKeyHandler, false);
  }

  public render() {
    const iconClasses = classNames('va-api-crisis-panel-icon', 'vads-u-margin-right--2');
    const listItemClasses = classNames(
      'vads-u-display--flex',
      'vads-u-flex-wrap--nowrap',
      'vads-u-align-items--center',
      'vads-u-border-bottom--1px',
      'vads-u-border-top--0',
      'vads-u-border-color--gray-lighter',  
    );

    return (
      <div className={classNames('va-crisis-panel', 'va-api-crisis-panel', 'vads-u-max-width--none')}>
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
            <li className={listItemClasses}>
              <FontAwesomeIcon icon={faPhone} className={iconClasses} />
              <a href="tel:18002738255" ref={this.firstListItemLink} className="vads-u-padding-x--0p5">
                Call <strong>1-800-273-8255 and press 1</strong>
              </a>
            </li>
            <li className={listItemClasses}>
              <FontAwesomeIcon icon={faMobileAlt} className={iconClasses} />
              <a href="sms:838255" className="vads-u-padding-x--0p5">Text <strong>838255</strong></a>
            </li>
            <li className={listItemClasses}>
              <FontAwesomeIcon icon={faComments} className={iconClasses} />
              <a href="https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat"
                className="vads-u-padding-x--0p5"
              >
                Start a confidential chat
              </a>
            </li>
            <li className={listItemClasses}>
              <FontAwesomeIcon icon={faDeaf} className={iconClasses} />
              <a href="tel:18007994889" className="vads-u-padding-x--0p5">
                Call TTY if you have hearing loss <strong>1-800-799-4889</strong>
              </a>
            </li>
          </ul>

          <p>
            Get more resources at &nbsp;
            <a href="https://www.veteranscrisisline.net/">VeteransCrisisLine.net</a>.
          </p>
        </div>
      </div>
    );
  }

  private escKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.props.visible) {
      this.props.closeHandler();
    }
  }
}

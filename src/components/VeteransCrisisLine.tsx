import * as React from 'react';

import './VeteransCrisisLine.scss';

import { faComments, faDeaf, faMobileAlt, faPhone, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';
import vclLogo from '../assets/vcl-logo.png';

interface IVeteransCrisisLineProps {
  visible: boolean;
  closeHandler: (event?: {}) => void; 
}

export class VeteransCrisisLine extends React.Component<IVeteransCrisisLineProps, {}> {
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
    const modalClasses = classNames(
      'va-modal', 
      'va-modal-large', 
      {
        'va-overlay': !this.props.visible,
        'va-overlay-open': this.props.visible,
      });

    return (
      <div id="modal-crisisline" className={modalClasses} role="alertdialog">
        <div className="va-crisis-panel va-modal-inner">
          <button className="va-modal-close va-overlay-close" onClick={this.props.closeHandler} type="button" aria-label="Close this modal">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

          <div className="va-overlay-body va-crisis-panel-body">
            <h3 className="va-crisis-panel-title">
              <img className="vcl-logo" src={vclLogo} alt="Veterans Crisis Line logo" 
                  aria-label="Veterans Crisis Line logo" />
              <span>We're here anytime, day or night - 24/7</span>
            </h3>
            <p>
              If you are a Veteran in crisis or concerned about one, connect with our caring,
              qualified responders for confidential help. Many of them are Veterans themselves.
            </p>
            <ul className="va-crisis-panel-list">
              <li>
                <FontAwesomeIcon icon={faPhone} className="va-crisis-panel-icon" />
                <a href="tel:18002738255" ref={this.firstListItemLink}>
                  Call <strong>1-800-273-8255 and press 1</strong>
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMobileAlt} className="va-crisis-panel-icon" />
                <a href="sms:838255">Text <strong>838255</strong></a>
              </li>
              <li>
                <FontAwesomeIcon icon={faComments} className="va-crisis-panel-icon" />
                <a href="https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat">
                  Start a confidential chat
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faDeaf} className="va-crisis-panel-icon" />
                <a href="tel:18007994889">
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
      </div>
    );
  }

  private escKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.props.visible) {
      this.props.closeHandler();
    }
  }
}

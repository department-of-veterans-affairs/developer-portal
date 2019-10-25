import * as React from 'react';

import Modal from '@department-of-veterans-affairs/formation-react/Modal';
import classNames from 'classnames';

import VeteransCrisisLinePanel from './VeteransCrisisLinePanel';

import './VeteransCrisisLine.scss';

import rightArrow from '../../assets/arrow-right-white.svg';

interface IVeteransCrisisLineState {
  modalVisibile: boolean;
}

export default class VeteransCrisisLine extends React.Component<{}, IVeteransCrisisLineState> {
  constructor(props: {}) {
    super(props);
    this.state = { modalVisibile: false };
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }

  public render() {
    return (
      <div className={classNames(
        'va-crisis-line',
        'vads-u-margin-right--0',
        'medium-screen:vads-u-margin-right--4',
      )}>
        <button 
          data-show="#crisis-line-modal"
          onClick={() => this.setState({ modalVisibile: true })}
          className={classNames(
            'va-crisis-line-button',
            'va-api-crisis-line-button',
            'vads-u-color--white',
            'vads-u-display--flex',
            'vads-u-justify-content--center',
            'vads-u-padding-right--0',
            'vads-u-width--full',
            'medium-screen:vads-u-width--auto',
        )}>
          <span className={classNames('vads-u-display--flex', 'vads-u-align-items--center')}>
            <span className={classNames('va-api-crisis-line-container', 'vads-u-margin-right--1')}>
              <span className={classNames('vcl', 'va-api-vcl-logo-white')} />
            </span>
            <span className="vads-u-margin-right--1">
              Talk to the&nbsp;<strong>Veterans Crisis Line</strong>&nbsp;now
            </span>
            <img src={rightArrow} 
              className={classNames('va-api-right-arrow', 'vads-u-margin-right--1')} 
              alt="" role="presentation" 
            />
          </span>
        </button>
        <Modal id="crisis-line-modal" visible={this.state.modalVisibile} focusSelector="#first-panel-info"
          onClose={() => this.setState({ modalVisibile: false })}
        >
          <VeteransCrisisLinePanel />
        </Modal>
      </div>
    );
  }

  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.state.modalVisibile) {
      this.setState({ modalVisibile: false });
    }
  }
}

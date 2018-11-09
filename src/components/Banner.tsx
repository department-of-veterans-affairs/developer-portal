import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/formation/AlertBox';

import './Banner.scss';

import closeButton from '../../node_modules/uswds/src/img/close.svg';
import flagIcon from '../../node_modules/uswds/src/img/favicons/favicon-40.png';

interface IContactState {
    menuVisible: boolean;
}

export class Banner extends React.Component<{}, IContactState> {

  constructor(props: {}) {
      super(props);
      this.state = { menuVisible: false }
  }

  public render() {
    return (
      <section className="usa-banner site-banner">
        <AlertBox status="info"
              headline={"This site is currently under development."}
              isVisible={true} />
        <header className="usa-banner-header">
          <div className="usa-grid usa-banner-inner">
            <img src={flagIcon} />
            <p>An official website of the United States government.</p>
            <div className="va-crisis-line">
              <div className="va-flex">
                <button data-show="#modal-crisisline" onClick={this.toggleVisible} className="va-crisis-line-button va-overlay-trigger">
                  <span className="va-flex">
                    <span className="vcl" />
                    Get help from Veterans Crisis Line
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div id="modal-crisisline"
            className={this.state.menuVisible ? "va-overlay-open va-modal va-modal-large" : "va-overlay va-modal va-modal-large"}
            role="alertdialog">
          <div className="va-crisis-panel va-modal-inner">

            <h3>Get help from Veterans Crisis Line</h3>

            <button className="va-modal-close va-overlay-close" onClick={this.toggleVisible} type="button" aria-label="Close this modal">
              <img src={closeButton} />
            </button>

            <div className="va-overlay-body va-crisis-panel-body">
              <ul>
                <li><a href="tel:18002738255">Call <strong>1-800-273-8255 (Press 1)</strong></a></li>
                <li><a href="sms:838255">Text to <b>838255</b></a></li>
                <li><a href="https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat">Chat <b>confidentially now</b></a></li>
              </ul>

              <p>If you are in crisis or having thoughts of suicide,
      visit <a href="https://www.veteranscrisisline.net/">VeteransCrisisLine.net</a> for more resources.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  private toggleVisible = () => {
    this.setState({menuVisible: !this.state.menuVisible});
  };
}

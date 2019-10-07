import * as React from 'react';

import VeteransCrisisLine from './VeteransCrisisLine';

import './Banner.scss';

import flagIcon from '../../node_modules/uswds/src/img/favicons/favicon-40.png';
import rightArrow from '../assets/arrow-right-white.svg';
import dotGovIcon from '../assets/icon-dot-gov.svg';
import httpsIcon from '../assets/icon-https.svg';

interface IBannerState {
    menuVisible: boolean;
    accordionVisible: boolean;
}

export default class Banner extends React.Component<{}, IBannerState> {

  constructor(props: {}) {
      super(props);
      this.state = {
        accordionVisible: false,
        menuVisible: false,
      };
  }

  public render() {
    const dotGovGuidanceText = `Federal government websites often end in .gov or .mil. Before sharing sensitive
                                information, make sure you're on a federal government site.`;
    const httpsGuidanceText = (
      <span>
        The <strong>https://</strong> ensures that you're connecting to the official website
        and that any information you provide is encrypted and sent securely.
      </span>
    );

    return (
      <section className="usa-banner site-banner">
        <div className="site-guidance usa-accordion">
          <header className="usa-banner-header">
            <div className="usa-grid usa-banner-inner">
              <div className="official-site-notice">
                <div><img src={flagIcon} alt="US flag" /></div>
                <div className="site-notice-text">
                  <div>An official website of the United States government.</div>
                  <button className="usa-accordion-button usa-banner-button" onClick={this.toggleAccordionVisible}
                        aria-expanded={this.state.accordionVisible ? "true" : "false"}>
                    <span className="usa-banner-button-text">
                      Here's how you know
                    </span>
                  </button>
                </div>
              </div>
              <div className="usa-banner-content usa-accordion-content" aria-hidden={this.state.accordionVisible ? "false" : "true"}>
                {this.renderSiteGuidance(
                    "banner-guidance-gov",
                    dotGovIcon,
                    "The .gov means it's official",
                    dotGovGuidanceText)}
                {this.renderSiteGuidance(
                    "banner-guidance-ssl",
                    httpsIcon,
                    "The site is secure.",
                    httpsGuidanceText)}
              </div>
              <div className="va-crisis-line">
                <div className="va-flex">
                  <button data-show="#modal-crisisline" onClick={this.toggleMenuVisible} className="va-crisis-line-button va-overlay-trigger">
                    <span className="va-flex">
                      <span className="vcl-container">
                        <span className="vcl" />
                      </span>
                      <span className="vcl-text">
                        Talk to the&nbsp;<strong>Veterans Crisis Line</strong>&nbsp;now
                      </span>
                      <img src={rightArrow} className="vcl-right-arrow" alt="" role="presentation" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
        <VeteransCrisisLine visible={this.state.menuVisible} closeHandler={this.toggleMenuVisible} />
      </section>
    );
  }

  private toggleMenuVisible = () => {
    this.setState(state => {
      return {menuVisible: !state.menuVisible};
    });
  }

  private toggleAccordionVisible = () => {
    this.setState(state => {
      return {accordionVisible: !state.accordionVisible};
    });
  }

  private renderSiteGuidance(className: string, iconContent: string, titleText: {}, bodyText: {}) {
    return (
      <div className={className}>
        <img className="usa-banner-icon usa-media_block-img" src={iconContent}
              alt="Dot Gov" />
        <div className="guidance-content usa-media_block-body">
          <div className="guidance-title">
            <strong>{titleText}</strong>
          </div>
          <div className="guidance-detail">
            {bodyText}
          </div>
        </div>
      </div>
    );
  }
}

import classNames from 'classnames';
import * as React from 'react';

import VeteransCrisisLine from './VeteransCrisisLine';

import flagIcon from '../../node_modules/uswds/src/img/favicons/favicon-40.png';
import rightArrow from '../assets/arrow-right-white.svg';
import dotGovIcon from '../assets/icon-dot-gov.svg';
import httpsIcon from '../assets/icon-https.svg';
import './Banner.scss';

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
      <section>
        <div className={classNames('site-guidance', 'vads-u-background-color--gray-dark')}>
          <header className={classNames('va-api-banner-header')}>
            <div className={classNames(
              'va-api-banner-inner',
              'vads-u-max-width--100',
              'vads-u-color--white',
              'medium-screen:vads-u-padding-x--4',
            )}>
              <div className={classNames('official-site-notice', 'vads-u-padding-y--0p25')}>
                <div>
                  <img src={flagIcon} 
                    alt="US flag" 
                    className={classNames(
                      'vads-u-margin-left--1p5',
                      'vads-u-margin-right--1',
                      'vads-u-margin-top--neg1',
                      'medium-screen:vads-u-margin-left--0',
                      'medium-screen:vads-u-margin-top--0',
                    )}
                  />
                </div>
                <div className="site-notice-text">
                  <div>An official website of the United States government.</div>
                  <button 
                    className={classNames(
                      'va-api-site-guidance-button',
                      'vads-u-margin--0',
                      'vads-u-margin-top--0p25',
                      'vads-u-padding--0',
                      'medium-screen:vads-u-margin-left--1',
                      'medium-screen:vads-u-margin-top--0',
                    )}
                    onClick={this.toggleAccordionVisible}
                    aria-expanded={this.state.accordionVisible ? "true" : "false"}
                  >
                    <span className={classNames(
                      'vads-u-font-weight--normal',
                      'vads-u-text-decoration--underline',
                    )}>
                      Here's how you know
                    </span>
                  </button>
                </div>
              </div>
              <div 
                className={classNames('usa-accordion-content', 'site-guidance-content')}
                aria-hidden={this.state.accordionVisible ? "false" : "true"}
              >
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
      <div className={classNames(
        'vads-u-display--flex',
        'vads-u-align-content--flex-start',
        className,
      )}>
        <img 
          className={classNames('vads-u-margin-right--1', 'vads-u-margin-top--0p5')}
          src={iconContent} 
          alt="Dot Gov" 
        />
        <div className="guidance-content">
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

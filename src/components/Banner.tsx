import classNames from 'classnames';
import * as React from 'react';

import flagIcon from '../../node_modules/uswds/src/img/favicons/favicon-40.png';
import dotGovIcon from '../assets/icon-dot-gov.svg';
import httpsIcon from '../assets/icon-https.svg';
import './Banner.scss';

interface IBannerState {
  accordionVisible: boolean;
}

export default class Banner extends React.Component<{}, IBannerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      accordionVisible: false,
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
        <div className="site-guidance">
          <header className={classNames('va-api-banner-header')}>
            <div className={classNames(
              'va-api-banner-inner',
              'vads-u-max-width--100',
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
            </div>
          </header>
        </div>
      </section>
    );
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

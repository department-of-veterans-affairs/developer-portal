import classNames from 'classnames';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { defaultFlexContainer } from '../../styles/vadsUtils';

import flagIcon from '../../../node_modules/uswds/src/img/favicons/favicon-40.png';
import dotGovIcon from '../../assets/icon-dot-gov.svg';
import httpsIcon from '../../assets/icon-https.svg';
import lockIcon from '../../assets/lock-icon.svg';
import './Banner.scss';

const GuidanceBoxPropTypes = {
  children: PropTypes.node,
  icon: PropTypes.string.isRequired,
  icon_alt: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
};

type GuidanceBoxProps = PropTypes.InferProps<typeof GuidanceBoxPropTypes>;

const GuidanceBox = (props: GuidanceBoxProps): JSX.Element => (
  <div
    id={props.id ?? undefined}
    className={classNames(
      'vads-l-col--12',
      'medium-screen:vads-l-col--6',
      'vads-u-display--flex',
      'vads-u-align-content--flex-start',
      'vads-u-line-height--4',
      'medium-screen:vads-u-padding-x--1p5',
    )}
  >
    <img
      className={classNames(
        'va-api-banner-guidance-icon',
        'vads-u-margin-right--1',
        'vads-u-margin-top--0p5',
      )}
      src={props.icon}
      alt={props.icon_alt ?? undefined}
      aria-hidden="true"
    />
    <div className="vads-u-margin-bottom--1p5">
      <p className="vads-u-font-weight--bold vads-u-margin--0">{props.title}</p>
      <div>{props.children}</div>
    </div>
  </div>
);

GuidanceBox.propTypes = GuidanceBoxPropTypes;

const Banner = (): JSX.Element => {
  const [accordionVisible, setAccordionVisible] = React.useState(false);

  const toggleAccordionVisible = (): void => setAccordionVisible(!accordionVisible);

  return (
    <div>
      <div
        className={classNames(
          'site-guidance',
          'vads-u-background-color--gray-lightest',
          'vads-u-padding-left--2',
          'vads-u-padding-top--0p5',
          'vads-u-padding-bottom--0p5',
          'medium-screen:vads-u-padding-left--4',
        )}
      >
        <div className="va-api-banner-header">
          <div className={classNames('va-api-banner-inner', 'vads-u-max-width--100')}>
            <div className={classNames(defaultFlexContainer(true))}>
              <div className="vads-u-display--flex">
                <img
                  src={flagIcon}
                  alt="US flag"
                  className="va-api-banner-icon"
                  aria-hidden="true"
                />
              </div>
              <div
                className={classNames(
                  'site-notice-text',
                  defaultFlexContainer(true),
                  'vads-u-margin-left--1',
                  'small-desktop-screen:vads-u-max-width--none',
                  'vads-u-color--base',
                )}
              >
                <p className="vads-u-padding-right--0p5">
                  An official website of the United States government
                </p>
                <button
                  id="toggle-how-you-know-dropdown"
                  className="va-api-site-guidance-button"
                  aria-label="Here's how you know this is an official website"
                  onClick={toggleAccordionVisible}
                  aria-expanded={accordionVisible ? 'true' : 'false'}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      'vads-u-font-weight--normal',
                      'vads-u-text-decoration--underline',
                    )}
                  >
                    Here&apos;s how you know
                  </span>
                </button>
              </div>
            </div>
            <div
              className={classNames(
                'usa-accordion-content',
                'vads-l-grid-container',
                'vads-u-background-color--gray-lightest',
              )}
              aria-hidden={accordionVisible ? 'false' : 'true'}
              aria-label="Here's how you know this is an official website"
              role="region"
            >
              <div className="vads-l-row">
                <GuidanceBox
                  id="dot-gov-guidance"
                  icon={dotGovIcon}
                  icon_alt="Government icon"
                  title="Official websites use .gov"
                >
                  <p className="vads-u-margin--0">
                    A <span className="vads-u-font-weight--bold">.gov</span> website belongs to an
                    official government organization in the United States.
                  </p>
                </GuidanceBox>
                <GuidanceBox
                  id="https-guidance"
                  icon={httpsIcon}
                  icon_alt="HTTPS browser icon"
                  title="Secure .gov websites use HTTPS"
                >
                  <p className="vads-u-margin--0">
                    A <span className="vads-u-font-weight--bold">lock</span> ({' '}
                    <img alt="https icon" className="va-api-banner-lock-icon" src={lockIcon} /> ) or{' '}
                    <span className="vads-u-font-weight--bold">https://</span> means you’ve safely
                    connected to the .gov website. Share sensitive information only on official,
                    secure websites.
                  </p>
                </GuidanceBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {};
export { Banner };

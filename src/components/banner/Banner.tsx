import classNames from 'classnames';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { defaultFlexContainer } from '../../styles/vadsUtils';

import flagIcon from '../../../node_modules/uswds/src/img/favicons/favicon-40.png';
import dotGovIcon from '../../assets/icon-dot-gov.svg';
import httpsIcon from '../../assets/icon-https.svg';
import './Banner.scss';
import { AppVersion } from '../../components';

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
      'medium-screen:vads-u-padding-x--1p5')}
  >
    <img
      className={classNames('va-api-banner-icon', 'vads-u-margin-right--1', 'vads-u-margin-top--0p5')}
      src={props.icon}
      alt={props.icon_alt ?? undefined}
      aria-hidden="true"
    />
    <div className="vads-u-margin-bottom--1p5" >
      <p className="vads-u-font-weight--bold vads-u-margin--0">
        {props.title}
      </p>
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
      <div className={classNames('site-guidance', 'vads-u-background-color--gray-dark')}>
        <div className={classNames('va-api-banner-header')}>
          <div
            className={classNames(
              'va-api-banner-inner',
              'vads-u-max-width--100',
              'vads-u-color--white',
              'medium-screen:vads-u-padding-x--4',
            )}
          >
            <div className={classNames(defaultFlexContainer(true), 'vads-u-padding-y--0p25')}>
              <div>
                <img
                  src={flagIcon}
                  alt="US flag"
                  className={classNames(
                    'va-api-banner-icon',
                    'vads-u-margin-left--1p5',
                    'vads-u-margin-right--1',
                    'vads-u-margin-top--neg1',
                    'medium-screen:vads-u-margin-left--0',
                    'medium-screen:vads-u-margin-top--0',
                  )}
                  aria-hidden="true"
                />
              </div>
              <AppVersion />
              <div
                className={classNames(
                  'site-notice-text',
                  defaultFlexContainer(true),
                  'vads-u-margin-left--1',
                  'vads-u-font-size--sm',
                  'small-desktop-screen:vads-u-max-width--none',
                )}
              >
                <p>An official website of the United States government.</p>
                <button
                  id="toggle-how-you-know-dropdown"
                  className={classNames(
                    'va-api-site-guidance-button',
                    'vads-u-color--white',
                    'vads-u-font-size--sm',
                    'vads-u-margin--0',
                    'vads-u-margin-top--0p25',
                    'vads-u-padding--0',
                    'small-desktop-screen:vads-u-margin-left--1',
                    'small-desktop-screen:vads-u-margin-top--0',
                  )}
                  aria-label="Here&apos;s how you know this is an official website"
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
                'vads-u-background-color--gray-dark')}
              aria-hidden={accordionVisible ? 'false' : 'true'}
              aria-label="Here&apos;s how you know this is an official website"
              role="region"
            >
              <div className="vads-l-row" >
                <GuidanceBox id="dot-gov-guidance" icon={dotGovIcon} icon_alt="Government icon" title="The .gov means it's official">
                  <p className="vads-u-margin--0">
                    Federal government websites often end in .gov or .mil. Before sharing sensitive
                    information, make sure you&apos;re on a federal government site.
                  </p>
                </GuidanceBox>
                <GuidanceBox id="https-guidance" icon={httpsIcon} icon_alt="HTTPS browser icon" title="The site is secure.">
                  <p className="vads-u-margin--0">
                    The <strong>https://</strong> ensures that you&apos;re connecting to the official website
                    and that any information you provide is encrypted and sent securely.
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

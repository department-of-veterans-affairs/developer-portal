import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Flag } from '../../flags';
import { FLAG_API_PUBLISHING } from '../../types/constants';

import logo from '../../assets/hero-logo.svg';

const Hero: React.FunctionComponent = (): JSX.Element => (
  <section
    aria-label="Page Hero"
    className={classNames(
      'vads-u-background-color--primary',
      'vads-u-padding-y--5',
      'vads-u-padding-x--0',
    )}
  >
    <div
      className={classNames(
        'vads-u-display--flex',
        'small-desktop-screen:vads-u-flex-direction--row',
        'vads-u-flex-direction--column-reverse',
        'vads-l-grid-container',
        'vads-u-margin-x--auto',
      )}
    >
      <div className={classNames('va-api-u-margin-y--auto')}>
        <div className="vads-u-max-width--100">
          <h1
            className={classNames(
              'vads-u-color--white',
              'vads-u-font-size--h2',
              'small-desktop-screen:vads-u-font-size--h1',
            )}
          >
            A Veteran-centered API platform for securely accessing VA data.
          </h1>
          <Link
            id="hero-read-api-docs"
            to="/explore"
            className={classNames(
              'usa-button',
              'va-api-button-default',
              'vads-u-margin-right--3',
              'vads-u-padding-x--4',
              'vads-u-width--full',
              'medium-screen:vads-u-width--auto',
            )}
          >
            Read the Docs
          </Link>
          <Flag name={[FLAG_API_PUBLISHING]}>
            <Link
              id="hero-api-publishing"
              to="/api-publishing"
              className={classNames(
                'usa-button',
                'va-api-button-secondary',
                'vads-u-padding-x--4',
                'vads-u-width--full',
                'medium-screen:vads-u-width--auto',
              )}
            >
              API Publishing
            </Link>
          </Flag>
        </div>
      </div>
      <div
        className={classNames(
          'small-desktop-screen:vads-u-width--auto',
          'va-api-u-width--200',
          'vads-u-margin-x--auto',
          'va-api-u-margin-y--auto',
        )}
      >
        <img src={logo} alt="" role="presentation" />
      </div>
    </div>
  </section>
);

Hero.propTypes = {};

export { Hero };

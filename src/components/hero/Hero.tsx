import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/hero-logo.svg';

const Hero: React.FunctionComponent = (): JSX.Element => (
  <section
    aria-label="Page Hero"
    className={classNames(
      'vads-u-background-color--primary',
      'vads-u-padding-y--9',
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
              'vads-u-font-size--h1',
              'small-desktop-screen:vads-u-font-size--h1',
            )}
          >
            A Veteran-centered API platform for securely accessing VA data
          </h1>
          <Link
            id="hero-read-api-docs"
            to="/apply"
            className={classNames(
              'usa-button',
              'va-api-button-default',
              'vads-u-margin-right--3',
              'vads-u-padding-x--4',
              'vads-u-width--full',
              'medium-screen:vads-u-width--auto',
            )}
          >
            Request an API Key
          </Link>
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

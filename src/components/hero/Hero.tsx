import classNames from 'classnames';
import * as React from 'react';
import './Hero.scss';
import logo from '../../assets/hero-logo.svg';

const Hero: React.FunctionComponent = (): JSX.Element => (
  <section
    aria-label="Page Hero"
    className={classNames('vads-u-background-color--primary', 'vads-u-padding-y--2p5')}
  >
    <div className={classNames('vads-l-grid-container', 'vads-u-margin-x--auto')}>
      <div className="vads-l-row">
        <div className="vads-l-col--12 medium-screen:vads-l-col--7">
          <h1
            className={classNames(
              'vads-u-color--white',
              'vads-u-font-size--h2',
              'small-desktop-screen:vads-u-font-size--h1',
              'vads-u-margin-top--1',
              'medium-screen:vads-u-margin-top--4',
            )}
          >
            Access VA APIs to build tools that best serve Veterans
          </h1>
        </div>
        <div className="vads-l-col--12 medium-screen:vads-l-col--5">
          <img className="hero-logo" src={logo} alt="" role="presentation" />
        </div>
      </div>
    </div>
  </section>
);

Hero.propTypes = {};

export { Hero };

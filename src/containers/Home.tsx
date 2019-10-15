import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Flag } from 'flag';
import apiDefinitions, { apiCategoryOrder } from '../apiDefs/data/categories';
import padlockImg from '../assets/homepage-padlock.png';
import apiImg from '../assets/homepage-reliable-api.png';
import CardLink from '../components/CardLink';
import Hero from '../components/Hero';
import './Home.scss';

const leftColumnClasses = classNames('medium-screen:vads-l-col--4', 'small-screen:vads-l-col--6', 'va-api-margin-y--auto');
const rightColumnClasses = classNames('medium-screen:vads-l-col--8', 'small-screen:vads-l-col--6', 'va-api-margin-y--auto');
const flexContainer = classNames('vads-l-grid-container', 'vads-u-margin-top--6', 'vads-u-margin-x--auto');

function ApiPlatform() {
  return (
    <section role="region" aria-label="An API platform">
      <div className={flexContainer}>
        <div className="vads-l-row">
          <div className={leftColumnClasses}>
            <img src={padlockImg} alt="padlock-image" />
          </div>
          <div className={rightColumnClasses}>
            <h2>
              A secure API platform to service Veterans.
            </h2>
            <div>
              Lighthouse is an API platform that gives developers secure access to the VA data they need to build helpful tools and services for Veterans.
              Streamlined and accessible, we designed a modern API development experience to easily build services that provide Veterans with consistent
              and reliable access to their data.
              &nbsp;<Link to="/documention">Read our documentation</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReliableApi() {
  return (
    <section role="region" aria-label="reliable API">
      <div className={flexContainer}>
        <div className="vads-l-row">
          <div className={leftColumnClasses}>
            <img src={apiImg} alt="api image" />
          </div>
          <div className={rightColumnClasses}>
            <h2>
              A modern, reliable API library.
            </h2>
            <div>
              Our library consists of APIs for Benefits, Health, Facilities, and Veteran Verification information. These APIs allow approved individuals
              and organizations to access VA information systems at no cost.
            </div>
            <div className="vads-u-display--none medium-screen:vads-u-display--block">
              <br />
              API Consumers can immediately request API key access to sandbox data to explore how they can use VA APIs to create tools that serve Veterans.
              Leveraging RESTful API, Open API and OAuth 2.0 standards, our APIs enable Veterans and service providers to achieve the following goals:
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiList() {
  return (
    <section>
      <div className={classNames(flexContainer, 'vads-u-margin-bottom--6')}>
        <div className="vads-l-row">
          <div className="medium-screen:vads-l-col--4" />
          <div className="medium-screen:vads-l-col--8">
            <div className="vads-l-row">
              {apiCategoryOrder.map((apiCategoryKey: string) => {
                const { name, content } = apiDefinitions[apiCategoryKey];
                return (
                  <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
                    <CardLink
                      className="medium-screen:vads-l-col--5"
                      name={`VA ${name}`}
                      url={`/explore/${apiCategoryKey}`}
                    >
                      {content.placardText}
                    </CardLink>
                  </Flag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

class Home extends React.Component {
  public render() {
    return (
      <div className="home">
        <Hero />
        <section role="region" aria-label="Veterans Notice">
          <div className={classNames(
            'vads-u-background-color--primary',
            'vads-u-font-size--lg',
            'vads-u-padding-y--0p5',
            'vads-u-text-align--center',
            'vads-u-color--white')}>
            <div className='vads-u-margin-y--2p5'>
              Are you a Veteran looking to submit a claim, manage benefits or access your health data?
              &nbsp;<Link className={classNames('vads-u-font-weight--bold', 'vads-u-color--white')} to="https://www.va.gov/">Visit VA.gov</Link>
            </div>
          </div>
        </section>
        <ApiPlatform />
        <ReliableApi />
        <ApiList />
      </div>
    );
  }
}

export default Home;

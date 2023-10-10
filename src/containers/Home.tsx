import * as React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

import { ExploreApiCard, Hero } from '../components';
import { lookupApiBySlug } from '../apiDefs/query';
import ApisLoader from '../components/apisLoader/ApisLoader';

import peopleGraphic from '../assets/people.svg';

const ApiList = (): JSX.Element => {
  const popularApis = ['veteran-confirmation', 'va-facilities', 'va-forms', 'patient-health'];

  return (
    <section className="api-list vads-u-padding-top--3 vads-u-padding-bottom--2">
      <div className="vads-l-grid-container vads-u-margin-x--auto">
        <h2 className="vads-u-margin-top--0">Featured APIs</h2>
        <Link to="/explore">View all</Link>
        <ApisLoader>
          <div
            className="vads-l-row vads-u-justify-content--space-evenly vads-u-margin-x--neg1p5"
            role="list"
          >
            {popularApis.map((urlSlug: string) => {
              const api = lookupApiBySlug(urlSlug);
              if (api) {
                return (
                  <div
                    key={urlSlug}
                    role="listitem"
                    className="vads-l-col--12 small-screen:vads-l-col--6 medium-screen:vads-l-col--3 vads-u-padding--2 vads-u-display--flex"
                  >
                    <ExploreApiCard api={api} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </ApisLoader>
      </div>
    </section>
  );
};

const GettingStarted = (): JSX.Element => (
  <section className="vads-u-background-color--white vads-u-margin-top--2p5">
    <div className="vads-l-grid-container vads-u-margin-x--auto">
      <div className="vads-l-row">
        <div className="vads-l-col--12 medium-screen:vads-l-col--7">
          <h2 className="vads-u-margin-bottom--0">Get started</h2>
          <p>Follow these steps to start developing with our APIs.</p>
          <ol className="process vads-u-margin-top--3">
            <li className="process-step list-one">
              <strong id="explore-our-apis">
                <Link to="/explore">Explore our APIs</Link>
              </strong>
              <p>Find the right API and start developing right away.</p>
            </li>
            <li className="process-step list-two">
              <strong id="request-production-access">
                <Link to="/onboarding/request-prod-access">Request production access</Link>
              </strong>
              <p>After testing your app in sandbox, start the path to production.</p>
            </li>
            <li className="process-step list-three">
              <strong id="complete-a-demo">
                <Link to="/onboarding/prepare-for-and-complete-a-demo">Complete a demo</Link>
              </strong>
              <p>
                Schedule, prepare, and complete a demo with us.
                <br />
                <em>No demo is needed for open data APIs.</em>
              </p>
            </li>
          </ol>
        </div>
        <div className="vads-l-col--5 vads-u-display--none medium-screen:vads-u-display--block">
          <img
            src={peopleGraphic}
            alt="Abstract cartoon graphic showing three people building a web application with colored blocks"
          />
        </div>
      </div>
    </div>
  </section>
);

const Home = (): JSX.Element => (
  <div className="home vads-l-grid-container--full">
    <Hero />
    <GettingStarted />
    <ApiList />
  </div>
);

export default Home;

import * as React from 'react';
import { Link } from 'react-router-dom';

import { PageHero } from '../components';

import './Home.scss';

class Home extends React.Component {
    public render() {
        return (
            <div className="Home">
              <PageHero
                  title="Put VA Data to Work"
                  content="Empowering our partners to build innovative, Veteran-centered solutions."
                  button="Learn more about VA APIs"
                  buttonLink="/explore"
                  />
              <section role="region" aria-label="API Top-Level List" className="usa-section api-section">
                <div className="usa-grid">
                  <h2>Explore VA APIs</h2>
                  <p className="usa-font-lead">
                    We want to empower our partners to build innovative solutions for Veterans. So we designed a framework to deliver a modern API development experience and rolled out our first set of standards-based APIs.
                  </p>
                </div>
                <div className="usa-grid">
                  <div className="usa-width-one-half">
                    <h3>VA Benefits API</h3>
                    <p>
                      Build tools to help Veterans electronically manage, submit, track, and receive notifications on their claims.
                    </p>
                    <Link className="usa-button usa-button-secondary" to="/explore/benefits">Learn more</Link>
                  </div>
                  <div className="usa-width-one-half">
                    <h3>VA Facilities API</h3>
                    <p>
                      Get information on VA facilities including contact information, location, hours of operation, available services, appointment wait times, and patient satisfaction.
                    </p>
                    <Link className="usa-button usa-button-secondary" to="/explore/facilities">Learn more</Link>
                  </div>
                </div>
                <div className="usa-grid">
                  <div className="usa-width-one-half">
                    <h3>VA Health API</h3>
                    <p>
                      Build tools to help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and securely share their information with caregivers and providers.
                    </p>
                    <Link className="usa-button usa-button-secondary" to="/explore/health">Learn more</Link>
                  </div>
                  <div className="usa-width-one-half">
                   <h3>VA Veteran Verification API</h3>
                    <p>
                      Build tools to help Veterans verify their Veteran status electronically on job sites, e-commerce sites, and third-party benefit sites.
                    </p>
                    <Link className="usa-button usa-button-secondary" to="/explore/verification">Learn more</Link>
                  </div>
                </div>
              </section>
              <section className="usa-section"  role="region"  aria-labelledby="discover">
                <div className="usa-grid">
                  <h2 id="discover">Discover How VA's Partners Use Our APIs</h2>
                  <p>
                    Today, 65% of disability and pension claims get to VA through paper or fax. Veterans and their families often use Veteran Service Organizations (VSOs) to help file claims, but in order to successfully submit a claim, VSOs need a way to securely access and submit a Veteran’s information. VA created the Benefits Intake API to streamline the data transfer process. Now VSOs can use VA’s Benefits Intake API to drastically cut down on the steps required to submit a claim, and send the necessary data directly to VA with the press of a button.
                  </p>
                </div>
                <div className="usa-grid">
                  <div className="usa-width-one-half">
                    <div className="video-wrapper">
                      <iframe src="https://www.youtube.com/embed/at69_Uz05vA" frameBorder="0" allowFullScreen={true} />
                    </div>
                  </div>
                </div>
              </section>
              <section className="usa-section getting-started" role="region" aria-labelledby="get-started">
                <div className="usa-grid">
                  <h2 id="get-started">Ready to Get Started?</h2>
                  <p>Below is a list of steps below to help you get started with the VA API Platform Management:</p>
                  <ol>
                    <li><Link to="/apply">Request an API Key</Link></li>
                    <li><a href="https://github.com/department-of-veterans-affairs/vets-api-clients/">Build your app</a></li>
                    <li><Link to="/go-live">Request production access</Link></li>
                  </ol>
                  <p>You can also <Link to ="/explore">check out our documentation for more information.</Link></p>
                </div>
              </section>
            </div>
        );
    }
}

export default Home

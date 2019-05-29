import * as React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
    public render() {
        return (
            <div className="Home">

              <div className="site-disclaimer">
                <strong>This is a beta site.</strong>
                &nbsp;We are always looking to make improvements.&nbsp;
                <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose">
                  <strong>Send us your feedback</strong>
                </a>
              </div>

              <section aria-live="polite" role="alert" className="usa-alert usa-alert-warning">
                <div className="usa-alert-body">
                  <h3 className="usa-alert-heading">You may have trouble accessing some of our APIs</h3>
                  <div className="usa-alert-text">
                    As of Tuesday evening, May 28, the <strong>Address Validation</strong>, <strong>Appeals Status</strong>, and <strong>Health</strong> APIs may not be responding properly. We apologize for the inconvenience and are working to resolve the issue as quickly as possible. Please check back here for updates.
                  </div>
                </div>
              </section>

              <section role="region" aria-label="Page Hero" className="usa-hero">
                <div className="usa-grid">
                  <div className="usa-hero-callout">
                    <h1>Put VA Data to Work</h1>
                    <p>Empowering our partners to build innovative, Veteran-centered solutions.</p>
                  </div>
                </div>
              </section>

              <section role="region" aria-label="API Top-Level List" className="usa-section">
                <div className="usa-grid">
                  <div className="usa-width-two-thirds">
                    <h2>Explore VA APIs</h2>
                    <p>
                      We want to empower our partners to build innovative solutions for Veterans. So we designed a framework to deliver a modern API development experience and rolled out our first set of standards-based APIs.
                    </p>
                  </div>
                  <div className="usa-width-one-whole">
                    <div className="va-api-container">
                      <Link className="va-api-card" to="/explore/benefits">
                        <h3 className="va-api-name">VA Benefits API</h3>
                        <p className="va-api-description">
                          Build tools to help Veterans electronically manage, submit, track, and receive notifications on their claims.
                        </p>
                      </Link>
                      <Link className="va-api-card" to="/explore/facilities">
                        <h3 className="va-api-name">VA Facilities API</h3>
                        <p className="va-api-description">
                          Get information on VA facilities including contact information, location, hours of operation, available services, appointment wait times, and patient satisfaction.
                        </p>
                      </Link>
                      <Link className="va-api-card" to="/explore/health">
                        <h3 className="va-api-name">VA Health API</h3>
                        <p className="va-api-description">
                        Build tools to help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and securely share their information with caregivers and providers.
                        </p>
                      </Link>
                      <Link className="va-api-card" to="/explore/verification">
                        <h3 className="va-api-name">VA Veteran Verification API</h3>
                        <p className="va-api-description">
                        Build tools to help Veterans verify their Veteran status electronically on job sites, e-commerce sites, and third-party benefit sites.
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              <div className="usa-grid">
                <div className="ruled-stars">{null}</div>
              </div>
              <section className="usa-section discover-apis" role="region"  aria-labelledby="discover">
                <div className="usa-grid">
                  <div className="usa-width-one-half">
                  <h2 id="discover">Discover How VA's Partners Use Our APIs</h2>
                    <p>
                      Today, 65% of disability and pension claims get to VA through paper or fax. Veterans and their families often use Veteran Service Organizations (VSOs) to help file claims, but in order to successfully submit a claim, VSOs need a way to securely access and submit a Veteran’s information. VA created the Benefits Intake API to streamline the data transfer process. Now VSOs can use VA’s Benefits Intake API to drastically cut down on the steps required to submit a claim, and send the necessary data directly to VA with the press of a button.
                    </p>
                  </div>
                  <div className="usa-width-one-half">
                  <div className="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/at69_Uz05vA" frameBorder="0" allowFullScreen={true} />
                  </div>
                  </div>
                </div>
              </section>
              <div className="usa-grid">
                <div className="ruled-stars">{null}</div>
              </div>
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

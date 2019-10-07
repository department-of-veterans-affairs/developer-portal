import { Flag } from 'flag';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getApiCategoryOrder, getApiDefinitions } from '../apiDefs/query';

import './Home.scss';

class Home extends React.Component {
  public render() {
    const apiDefinitions = getApiDefinitions();
    const apiCategoryOrder = getApiCategoryOrder();

    return (
      <div className="home">

        <div className="site-disclaimer">
          <strong>This is a beta site.</strong>
          &nbsp;We are always looking to make improvements.&nbsp;
            <Link to="/support">
            <strong>Send us your feedback</strong>
          </Link>
        </div>

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
                {apiCategoryOrder.map((apiCategoryKey: string) => {
                  const { name, content } = apiDefinitions[apiCategoryKey];
                  return (
                    <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
                      <Link className="va-api-card" to={`/explore/${apiCategoryKey}`}>
                        <h3 className="va-api-name">VA {name}</h3>
                        <p className="va-api-description">{content.placardText}</p>
                      </Link>
                    </Flag>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <div className="usa-grid">
          <div className="ruled-stars">{null}</div>
        </div>
        <section className="usa-section discover-apis" role="region" aria-labelledby="discover">
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
            <p>You can also <Link to="/explore">check out our documentation for more information.</Link></p>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;

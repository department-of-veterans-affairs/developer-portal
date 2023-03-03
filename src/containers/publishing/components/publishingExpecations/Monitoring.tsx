/* eslint-disable max-lines */
import React from 'react';

const Monitoring = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Monitoring Expectations Summary">
      <h3 id="monitoring-what-we-provide">What we provide</h3>
      <ul>
        <li>A way to develop transparency and trust with consumers regarding functionality</li>
        <li>Help and support working through technical barriers and problems</li>
        <li>Issue and downtime alerting for you and your consumers</li>
      </ul>
      <h3 id="monitoring-what-we-need-from-you">What we need from you</h3>
      <ul>
        <li>A health check endpoint to determine API availability and functionality</li>
        <li>
          Fast, clear, and responsive communication regarding downtime messaging, updates, and
          resolution
        </li>
        <li>Clear, timely communication regarding scheduled downtime</li>
      </ul>
      <h3 id="monitoring-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>
          You must be willing to publish your availability data on our{' '}
          <a href="https://valighthouse.statuspage.io/">API status page</a>.
        </li>
        <li>
          Each API should have a health check endpoint that returns a 200 response if the system is
          available, a 500 response if it&apos;s not available, or no response if the system is
          entirely down.
        </li>
        <li>
          Expected availability times vary depending on the environment and internal/external
          status.
        </li>
      </ul>
    </div>
    <p>
      Developers will grow to distrust APIs that are frequently unavailable or not transparent about
      availability. We expect APIs to provide a health check endpoint that can be queried to
      determine if the API is operational. API teams must be willing to have this availability data
      published on our <a href="https://valighthouse.statuspage.io/">API status page</a>.
    </p>
    <p>
      At minimum, health checks may stop at the border of the systems implementing the API, but we
      encourage full adoption of our monitoring policy, which ensures clarity regarding
      functionality and allows easier identification of problems and issues.
    </p>
    <p>
      Each API should have a health check endpoint that returns a 200 response if the system is
      available, and a 500 response if it&apos;s not available, or no response if the system is
      entirely down.
    </p>
    <p>Expected availability varies by environment and whether the API is internal or external.</p>
    <ul>
      <li>
        In the production environment, the API Gateway has a service level objective of 99.9%. This
        means it can be unavailable for no more than 8 and 9 hours per year.
      </li>
      <li>
        In the sandbox environment, the API Gateway has a service level objective of 99.0%
        availability Monday through Friday, from 7:00 a.m. to 9:00 p.m. ET (excluding holidays).
        This means the gateway can be unavailable for up to no more than about 3 hours a month
        during these VA business hours.
      </li>
      <li>
        There is no scheduled maintenance on the API Gateway in either environment, as the API
        Gateway has zero-downtime deployments.
      </li>
      <li>
        Every effort should be made for internal APIs to have 99.9% availability in production and
        99.0% availability in the sandbox environment. The Lighthouse team is willing to help work
        through any technical or policy barriers to achieve this.
      </li>
    </ul>
  </div>
);

export default Monitoring;

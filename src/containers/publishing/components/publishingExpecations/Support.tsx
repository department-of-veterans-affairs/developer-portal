/* eslint-disable max-lines */
import React from 'react';

const Support = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Support Expectations Summary">
      <h3 id="support-what-we-provide">What we provide</h3>
      <ul>
        <li>
          First level of support to consumers, enabling you to focus on deeper issues requiring your
          attention
        </li>
        <li>
          A well-defined support process to ensure you are quickly aware of issues that need your
          attention
        </li>
        <li>Clear and consistent escalation procedure for consumers</li>
      </ul>
      <h3 id="support-what-we-need-from-you">What we need from you</h3>
      <p>
        Clear, timely communication about any problems or issues so we can resolve them together
      </p>
      <h3 id="support-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>We require all APIs on Lighthouse to have a support plan.</li>
        <li>
          Lighthouse provides the first level of support to consumers or developers, and will
          escalate to you as needed.
        </li>
      </ul>
    </div>
    <p>
      Consumers using your API will need to integrate it into their own support plans, and it&apos;s
      easier for consumers to use your API if you have a robust support plan already in place.
      Because of this, we expect each API&apos;s support plan to include, at minimum:
    </p>
    <ul>
      <li>Bug reporting</li>
      <li>Addressing documentation flaws</li>
      <li>Reachability or connection issues</li>
      <li>Triage and escalation</li>
    </ul>
    <p>
      Lighthouse will provide the first level of support to consumers. We will help answer questions
      or address challenges that are not specific to the domain of your API, and pass along support
      requests that require a deeper understanding of your API. We work with you to help you
      determine the best support arrangement.
    </p>
  </div>
);

export default Support;

/* eslint-disable max-lines */
import React from 'react';
import { Link } from 'react-router-dom';

const Security = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Security Expectations Summary">
      <h3 id="security-what-we-provide">What we provide</h3>
      <p>We work hard to ensure your API is secure on Lighthouse by providing:</p>
      <ul>
        <li>High availability times</li>
        <li>Monitoring to mitigate security attacks</li>
        <li>
          Multiple levels of authorization to ensure data stays safe (review our page on
          authentication and authorization for more)
        </li>
        <li>Adherence to VA security protocols that comply with industry best practices</li>
      </ul>
      <h3 id="security-what-we-need-from-you">What we need from you</h3>
      <ul>
        <li>Review our policies and ask us any questions you might have</li>
        <li>Work with us to determine the appropriate authorization approach for your API</li>
      </ul>
      <h3 id="security-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>
          We rely on mature software such as: Kong (nginx), PostgreSQL, and Okta, which are used in
          other security-sensitive environments.
        </li>
        <li>
          Our software runs in VA&apos;s&nbsp;
          <a href="https://www.cisa.gov/federal-information-security-modernization-act">
            FISMA-compatible
          </a>
          &nbsp;Amazon Web Services (AWS) data center, which is subject to VA Handbook continuous
          monitoring requirements.
        </li>
        <li>We use a variety of methods to provide authentication and security.</li>
      </ul>
    </div>
    <p>
      Lighthouse has a full authorization to operate (ATO) at the FISMA Moderate level. We also
      complete a privacy impact assessment and privacy threshold analysis whenever the API gateway
      sends new kinds of data to new systems.
    </p>
    <p>
      Our <a href="https://api.va.gov">production</a> and{' '}
      <a href="https://sandbox-api.va.gov">sandbox</a> environments are deployed in the VA
      Enterprise Cloud&apos;s AWS GovCloud region, sitting behind the VA Trusted Internet Connection
      (TIC), and in compliance with VA&apos;s external system network requirements.
    </p>
    <p>
      We rely on mature software that is used in other security-sensitive environments: Kong
      (nginx), PostgreSQL, and Okta. These are all running in VA&apos;s&nbsp;
      <a href="https://www.cisa.gov/federal-information-security-modernization-act">
        FISMA-compatible
      </a>
      &nbsp;AWS data center and are subject to VA Handbook continuous monitoring requirements.
    </p>
    <h3 id="addressing-security-risks">Addressing Security Risks</h3>
    <p>
      If you have a simple API that publishes shared information about VA, there are very few
      security risks to address, and we use a variety of methods to provide authentication and
      security. You can read more about this on our{' '}
      <Link to="/explore/authorization">Authentication and Authorization</Link> page, but to start,
      here are some of the ways our authentication offers additional security:
    </p>
    <ul>
      <li>
        We use a vetted, commercial-identity proofing solution, ID.me, to verify the identities of
        Veterans and their representatives.
      </li>
      <li>
        We use a vetted, commercial-identity management service (
        <a href="https://www.okta.com/">Okta</a>) to authorize API access.
      </li>
      <li>
        For APIs that expose Veteran protected health information or personal identifiable
        information (PHI or PII), we issue authorization tokens through our OAuth flow, with Okta
        serving as a broker between ID.me and Master Person Index (MPI).
      </li>
      <li>
        If your API provides access to Veteran PHI/PII <strong>and</strong> interaction with VA
        system users, but <strong>does not</strong> provide Veteran-facing interaction, the API
        Gateway will provide a mechanism to integrate with VA Single Sign-on internal (SSOi).
      </li>
      <li>For APIs that do not expose PII/PHI, we issue unique API keys.</li>
      <li>
        We are currently in the process of integrating with VA single sign-on to provide
        authentication for VA employees and internal system-to-system API integrations.
      </li>
    </ul>
    <p>
      By using the API Gateway, you are broadening the reach of your API. With that benefit comes
      the cost of potentially higher system load, but this can be mitigated. For example:
    </p>
    <ul>
      <li>
        The API Gateway only supports HTTPS. This means that if your API has not yet been upgraded
        to use HTTPS, you can expose it through the API Gateway while being compatible with{' '}
        <a href="https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/memoranda/2015/m-15-13.pdf">
          the OMB policy to require secure connections
        </a>
        , which protects Veterans from having their traffic monitored.
      </li>
      <li>
        The API Gateway is intended to be incorporated into a layered system. This means that while
        the API Gateway cannot mitigate all of the threats faced by your API, it works with other
        intermediary servers that provide more security-focused features.
      </li>
      <li>
        The operational security of your organization could be bolstered by the greater availability
        of your API. Some attacks rely on an attacker overloading an automated system, forcing staff
        to rely on error-prone manual backup processes. The rate limiting and high availability
        offered by the API Gateway can reduce the effectiveness of such an attack.
      </li>
      <li>
        You may choose to make your API reject requests coming from the API Gateway, or work with us
        to disable your API Gateway integration. Either of these options will allow you to limit the
        attack surface of your API while leaving your API operational for internal consumers.
      </li>
    </ul>
    <p>
      The API Gateway is a shared system. If the availability target for your API is higher than the
      availability target for the API Gateway (99.9%), then you will need to mitigate the risk of
      lower-than-expected availability.
    </p>
  </div>
);

export default Security;

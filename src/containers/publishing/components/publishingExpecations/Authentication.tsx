/* eslint-disable max-lines */
import React from 'react';
import { Link } from 'react-router-dom';

const Authentication = (): JSX.Element => (
  <div>
    <div
      className="feature"
      role="region"
      aria-label="Authentication and Authorization Expectations Summary"
    >
      <h3 id="authentication-what-we-provide">What we provide</h3>
      <ul>
        <li>
          A single entity with which to negotiate authentication, saving you time and reducing
          friction for your consumers
        </li>
        <li>Multiple authentication types to support many common integration needs</li>
        <li>OAuth client applications to make API calls on behalf of Veterans</li>
        <li>
          For certain APIs, API keys allow consumers to make API calls without authorization, while
          still verifying identity
        </li>
      </ul>
      <h3 id="authentication-what-we-need-from-you">What we need from you</h3>
      <p>Agreement on which authorization and authentication methods best fit your API</p>
      <h3 id="authentication-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>We use OAuth to ensure API interactions are secure and seamless.</li>
        <li>An API key may be used to authenticate APIs that do not use PHI or PII.</li>
        <li>
          Consumers are granted access to the sandbox environment before they have production
          access.
        </li>
      </ul>
    </div>
    <p>
      Unifying API access through the API Gateway benefits not only you, but your consumers. We
      support multiple authentication types to support many common integration needs, including:
    </p>
    <ul>
      <li>Veteran authentication</li>
      <li>Representative authentication</li>
      <li>VA employee/contractor authentication</li>
      <li>VA backend system authentication</li>
    </ul>
    <h3 id="oauth">OAuth</h3>
    <p>
      <a href="https://oauth.net/">OAuth</a> is short for Open Authorization, and is an open-source
      protocol that allows a user to grant a third-party access to their personal information.
      Examples are:
    </p>
    <ul>
      <li>A Veteran granting a mobile application access to their VA health records</li>
      <li>
        A Veteran service officer allowing a case management system to check a Veteran&apos;s
        benefits status
      </li>
      <li>A Veteran authorizing a discount program to confirm their Veteran status</li>
    </ul>
    <p>
      Through OAuth, Lighthouse ensures that API interactions are secure and seamless to the end
      user. We generate and send an OAuth token that securely retrieves, sends, and updates data.
    </p>
    <p>
      Consumers whose application cannot securely hide a client secret will use our{' '}
      <a href="https://oauth.net/2/pkce/">PKCE</a> OAuth flow.
    </p>
    <h3 id="api-key">API Key</h3>
    <p>
      APIs that don&apos;t include PII/PHI are secured using an API key, an authentication mechanism
      relying on the generation of a secret key, which is shared with each unique API consumer. This
      way, each consumer is approved before being granted access.
    </p>
    <p>
      We are in the process of an integration with the VA single sign-on platform, which will offer:
    </p>
    <ul>
      <li>
        <strong>SSOi</strong>: single-sign on for internal users, which are VA employees or
        contractors using VA systems
      </li>
      <li>
        <strong>SSOe</strong>: single sign on for external users, such as Veterans and associates
        signing into public-facing websites like VA.gov, or using a third-party external app
        integrated with VA data
      </li>
    </ul>
    <p>
      API keys are maintained within Kong. There is no default expiration date. If a key needs to be
      rotated on a recurring basis, Lighthouse can either update the key immediately, or update it
      on a rolling basis, where both keys work for a short period of time and the consumer
      facilitates the update on their end with no downtime. The information passed to the API
      provider does not change when the key is updated for the consumer.
    </p>
    <h3 id="sandbox-and-production-access">Sandbox and production access</h3>
    <p>
      API consumers are granted access to the sandbox environment first, so they can test your API
      without data risk. When they&apos;re ready, they become approved for production access using
      our <Link to="/go-live">Path to Production</Link>.
    </p>
  </div>
);

export default Authentication;

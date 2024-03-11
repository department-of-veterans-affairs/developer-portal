/* eslint-disable max-lines */
import {
  VaAccordion,
  VaAccordionItem,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';

const WorkingWithOurAPIs = (): JSX.Element => (
  <div>
    <Helmet>
      <title>Working with Lighthouse APIs</title>
    </Helmet>
    <PageHeader header="Working with Lighthouse APIs" />
    <p>
      Integrating with Lighthouse APIs can help your app’s users get faster, more reliable access to
      the data they need. This page tells you more about what you can expect while working with
      Lighthouse APIs, including information about rate limiting, feature requests, status updates,
      and more.
    </p>
    <h2 id="versioning">Versioning</h2>
    <VaAccordion uswds>
      <VaAccordionItem
        uswds
        header="Thoughtful, consistent versioning to reduce the impact of changes."
      >
        <p>
          Breaking changes to published API versions can be disruptive to using APIs, so our policy
          is to ensure breaking changes aren’t published without a major version change. We will
          send you notifications before any new features or versions are added.
        </p>
        <p>
          We define a breaking change as any change that might adversely impact your use of an API.
          For example, removing an endpoint or field would be classified as a breaking change. A
          non-breaking change is one that does not adversely impact current users of an API, such as
          adding an endpoint or field. Non-breaking changes do not require a new version, but
          changes that could impact your experience or use of an API will have an accompanying
          release note.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="deprecation-and-deactivation">Deprecation and deactivation</h2>
    <VaAccordion uswds>
      <VaAccordionItem
        uswds
        header="The right notifications at the right time about deprecated functionality."
      >
        <p>
          We occasionally deactivate features and versions of APIs based on updates and new
          technology. Before any functionality is deactivated, we will announce the change through
          release notes and note the deprecated functionality. We intend to make as few breaking
          changes as possible and to let you know as far in advance as possible.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="rate-limiting">Rate limiting</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Consistent rate limiting at 60 requests per minute.">
        <p>
          Rate limiting is enforced at 60 requests per minute per consumer. Requests to APIs that
          don’t require authentication, like health checks, are rate limited per IP address.
        </p>
        <h3 id="rate-limit-headers">Understanding rate limit response headers</h3>
        <p>
          Real-time rate limit information is returned in the response headers for each request.
          Each response will contain at least 5 response headers.
        </p>
        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ratelimit-limit</td>
              <td>The total number of requests allowed for a rate limit for a specific request.</td>
            </tr>
            <tr>
              <td>ratelimit-remaining</td>
              <td>The number of requests remaining for a specific rate limit.</td>
            </tr>
            <tr>
              <td>ratelimit-reset</td>
              <td>The seconds remaining until the rate limit balance resets.</td>
            </tr>
            <tr>
              <td>X-ratelimit-minute</td>
              <td>
                Rate limit that applies to the service or route. Most times, this will match what is
                returned in the ratelimit-limit header.
              </td>
            </tr>
            <tr>
              <td>X-ratelimit-remaining-minute</td>
              <td>
                Number of requests remaining for the rate limit that applies to the service or
                route. Most times, this will match what is returned in the ratelimit-remaining
                header.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          More than one rate limit can apply to some requests. In these cases, additional headers
          are returned to take those rate limits into account. For example, a request with an
          additional rate limit for seconds would return the five headers listed above as well as
          the following two:
        </p>
        <ul>
          <li>X-ratelimit-second</li>
          <li>X-ratelimit-remaining-second</li>
        </ul>
        <h3 id="increasing-rate-limit">Increasing your rate limit</h3>
        <p>
          If you exceed the rate limiting quota, your request will return a 429 status code. You may
          petition for increased rate limits by emailing us at{' '}
          <a href="mailto:api@va.gov">api@va.gov</a> with the following:
        </p>
        <ul>
          <li>Documentation of 429 errors in your logs</li>
          <li>Explanation of why you need to make more than 60 requests/min</li>
        </ul>
        <p>
          Rate limit increases are decided on a case-by-case basis and we do not alter the rate
          limit for sandbox.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="environments">Environments</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Testing and production environments with robust uptime SLAs.">
        <h3 id="sandbox">Sandbox</h3>
        <p>
          Our <a href="https://sandbox-api.va.gov">sandbox environment</a> is deployed in the VA
          Enterprise Cloud&apos;s AWS GovCloud region, sitting behind the VA Trusted Internet
          Connection (TIC), and is in compliance with VA’s external system network requirements.
        </p>
        <p>
          Getting access to the sandbox environment is easy, and for most APIs, automatic. Apply for
          access credentials from an API&apos;s overview page. Submitting the form will require you
          to agree to our terms of service.
        </p>
        <h3 id="production">Production</h3>
        <p>
          Our <a href="https://api.va.gov">production environment</a> is deployed in the VA
          Enterprise Cloud&apos;s AWS GovCloud region, sitting behind the VA Trusted Internet
          Connection (TIC), and is in compliance with VA’s external system network requirements.
        </p>
        <p>
          We closely monitor access to the production environment, which is why we have developed
          the consumer onboarding process and regularly complete consumer audits to ensure Veteran
          data remains safe and secure.
        </p>
        <p>The production environment has a 99.9% uptime SLA. Its hostname is api.va.gov.</p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="status-alerts">Status alerts, uptime, and issue reporting</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Alerts and notifications when you need them most.">
        <p>
          We post status updates about scheduled maintenance, unscheduled downtime, and more on our{' '}
          <a href="https://valighthouse.statuspage.io/">status page</a>.
        </p>
        <p>
          Expected availability varies by environment and whether the API is internal or external.
        </p>
        <ul>
          <li>
            In the production environment, the API Gateway has a service level objective of 99.9%.
            This means it can be unavailable for no more than 8 to 9 hours per year.
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
            Every effort is made for internal APIs to have 99.9% availability in production and
            99.0% availability in the sandbox environment.
          </li>
        </ul>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="support">Support</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="We’re here for you whenever you have questions.">
        <p>
          If you find an issue that may impact an API’s status, let us know through our{' '}
          <Link to="/support/contact-us">support page </Link>
          and we will get back to you within one business day.
        </p>
        <p>
          We support your need to integrate our APIs into the support plan, and provide, at a
          minimum, the following for each of our APIs:
        </p>
        <ul>
          <li>Bug reporting</li>
          <li>Addressing documentation flaws</li>
          <li>Reachability or connection issues</li>
          <li>Triage and escalation</li>
        </ul>
        <p>
          Lighthouse acts as your first level of support, but we will triage and escalate issues
          directly to the API provider as needed.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="managing-feature-requests">Managing feature requests</h2>
    <VaAccordion uswds>
      <VaAccordionItem
        uswds
        header="Improving your experience and getting you the functionality you need."
      >
        <p>
          We look to our consumers for feature requests, such as suggestions for improvements to
          functionality or ideas for new features. Improving your experience, and through that, the
          experience and lives of Veterans is our primary concern.
        </p>
        <p>
          If you have a feature request for us, let us know through our{' '}
          <Link to="/support/contact-us">contact us</Link> page. We’ll let you know the status of
          your request at least once a month until it is complete.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="auditing-process">Auditing process and guidelines</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Robust and secure auditing to protect you and VA data.">
        <p>
          We periodically perform auditing to remove inactive API keys and OAuth credentials, and to
          ensure the security and integrity of Veteran data. Our audits confirm that:
        </p>
        <ul>
          <li>All terms you’ve agreed to are still being followed</li>
          <li>Your app is still secure and is “risk” free</li>
          <li>
            There are no updates we need to make to increase security or improve the user experience
          </li>
        </ul>
        <p>
          Future audits may be required when there is a new version of your application, if there
          are changes to your terms of service, or if there are updates to the API.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="security">Security</h2>
    <VaAccordion uswds>
      <VaAccordionItem
        uswds
        header="The highest security standards based on industry best practices."
      >
        <p>
          Lighthouse has full authorization to operate (ATO) at the FISMA Moderate level. We also
          complete a privacy impact assessment and privacy threshold analysis whenever the API
          gateway sends new kinds of data to new systems.
        </p>
        <p>
          We rely on mature software that is used in other security-sensitive environments: Kong
          (nginx), PostgreSQL, and Okta. These are all running in VA&apos;s{' '}
          <a href="https://www.cisa.gov/federal-information-security-modernization-act">
            FISMA-compatible
          </a>{' '}
          AWS data center and are subject to VA Handbook’s continuous monitoring requirements.
        </p>
        <p>Here are some of the ways our authentication offers additional security:</p>
        <ul>
          <li>
            We use a vetted, commercial-identity proofing solution, ID.me, to verify the identities
            of Veterans and their representatives.
          </li>
          <li>
            We use a vetted, commercial-identity management service{' '}
            <a href="https://www.okta.com/">(Okta)</a> to authorize API access.
          </li>
          <li>
            For APIs that expose Veteran protected health information or personal identifiable
            information (PHI or PII), we issue authorization tokens through our OAuth flow, with
            Okta serving as a broker between ID.me and Master Person Index (MPI).
          </li>
          <li>
            If the API provides access to Veteran PHI/PII <strong>and</strong> interaction with VA
            system users but
            <strong> does not</strong> provide Veteran-facing interaction, the API Gateway will
            provide a mechanism to integrate with VA Single Sign-on internal (SSOi).
          </li>
          <li>For APIs that do not expose PII/PHI, we issue unique API keys.</li>
          <li>
            We are currently in the process of integrating with VA single sign-on to provide
            authentication for VA employees and internal system-to-system API integrations.
          </li>
        </ul>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="api-documentation-standards">API Documentation Standards</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Consistent and thorough API documentation.">
        <p>
          To be added to Lighthouse, an API needs reference material in the form of{' '}
          <a href="https://swagger.io/docs/specification/about/">OpenAPI specification</a>. This
          documentation should also include a description of the API’s purpose, helpful context
          specific to that API, and examples that demonstrate the use of the API. With Lighthouse,
          no additional documentation is needed outside of what is published on the Lighthouse
          development portal, making it easier for you to integrate with our APIs.
        </p>
      </VaAccordionItem>
    </VaAccordion>
    <h2 id="authentication-and-authorization">Authentication and authorization</h2>
    <VaAccordion uswds>
      <VaAccordionItem
        uswds
        header="Methods of authentication and authorization for all your consumers’ needs."
      >
        <p>
          Unifying API access through the API Gateway benefits our API providers and those who
          consume their APIs, like you. We support multiple authentication types for many common
          integration needs, including:
        </p>
        <ul>
          <li>Veteran authentication</li>
          <li>Representative authentication</li>
          <li>VA employee/contractor authentication</li>
          <li>VA backend system authentication</li>
        </ul>
        <h3 id="oauth">OAuth</h3>
        <p>
          <a href="https://oauth.net/">OAuth</a> is short for Open Authorization and is an
          open-source protocol that allows a user to grant third-party access to their personal
          information. Examples are:
        </p>
        <ul>
          <li>A Veteran granting a mobile application access to their VA health records</li>
          <li>
            A Veteran service officer allowing a case management system to check a Veteran’s
            benefits status
          </li>
          <li>A Veteran authorizing a discount program to confirm their Veteran status</li>
        </ul>
        <p>
          Through OAuth, Lighthouse ensures that API interactions are secure and seamless. We
          generate and send an OAuth token that securely retrieves, sends, and updates data.{' '}
        </p>
        <p>
          Consumers whose application cannot securely hide a client secret will use our{' '}
          <a href="https://oauth.net/2/pkce/">PKCE</a> OAuth flow.
        </p>
        <h3 id="api-key">API Key</h3>
        <p>
          APIs that don&apos;t include PII/PHI are secured using an API key, an authentication
          mechanism relying on the generation of a secret key, which is shared with each unique API
          consumer. This way, each consumer is approved before being granted access.
        </p>
        <p>
          API keys are maintained within Kong. There is no default expiration date. If a key needs
          to be rotated on a recurring basis, Lighthouse can either update the key immediately or
          update it on a rolling basis, where both keys work for a short period of time and the
          consumer facilitates the update on their end with no downtime. The information passed to
          the API provider does not change when the key is updated for the consumer.
        </p>
        <h3 id="sso">SSO</h3>
        <p>
          We are in the process of an integration with the VA single sign-on platform, which will
          offer:
        </p>
        <ul>
          <li>
            <strong>SSOi: </strong> single-sign on for internal users, which are VA employees or
            contractors using VA systems
          </li>
          <li>
            <strong>SSOe: </strong>
            single sign on for external users, such as Veterans and associates signing into
            public-facing websites like VA.gov, or using a third-party external app integrated with
            VA data
          </li>
        </ul>
      </VaAccordionItem>
    </VaAccordion>
  </div>
);

export default WorkingWithOurAPIs;

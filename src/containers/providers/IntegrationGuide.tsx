/* eslint-disable max-lines */
import React from 'react';
import { Helmet } from 'react-helmet';
import { CodeWrapper, PageHeader } from '../../components';

const IntegrationGuide = (): JSX.Element => (
  <section className="vads-u-padding-y--5">
    <div className="vads-l-grid-container">
      <div>
        <Helmet>
          <title>Provider Integration Guide</title>
        </Helmet>
        <PageHeader header="Lighthouse API Provider Integration Guide" />
        <p>
          The Lighthouse platform offers an API gateway that VA teams can use to publish their API,
          exposing it to the internet. This can be an effective way to allow external applications
          to consume your VA API. This document will explain how to integrate with the API gateway
          as part of this publishing process.
        </p>
        <h2 id="authentication-and-authorization">Authentication and Authorization</h2>
        <p>
          When publishing your API on the Lighthouse API platform you will need to choose whether
          and how to secure requests made to your API. Your API will have a URL path prefix (e.g.{' '}
          <code>/services/va_facilities/v1</code>) and all requests using that path prefix will be
          subject to the same authorization mechanism. You have three choices of authorization:
          None, API keys, and OpenID Connect (based on OAuth 2.0). Which choice is appropriate for
          your API depends on the functionality you&apos;re providing and the users and applications
          making API requests.
        </p>
        <h3 id="no-authorization">No Authorization</h3>
        <p>
          This is technically an option. If you have an API backend that is simply hosting static,
          non-sensitive data about the VA then this option might be appropriate. If you have an
          application backend providing your API then you should avoid this option.
        </p>
        <h3 id="api-key-authorization">API Key Authorization</h3>
        <p>
          Every developer that signs up for an API key through developer.va.gov receives an API key.
          These API keys are used to authenticate the developer. For APIs that require
          authorization, the Lighthouse platform team maintains access control lists (ACLs) that
          restrict who can call each API. That is, for API requests to <code>api.va.gov</code> the
          developer needs to request that they be added to the ACL for each API that they want to
          call. Conversely, every developer has access to the APIs on{' '}
          <code>sandbox-api.va.gov</code>. Since this access is granted automatically to any
          developer who signs up, you must ensure that the API you publish through{' '}
          <code>sandbox-api.va.gov</code> does not expose any Veteran data.
        </p>
        <p>
          If you&apos;re planning to secure your API by requiring requests to be secured by an API
          key, your backend should expect to receive a few custom HTTP headers. These are added to
          the request by the API gateway after the caller is authenticated and authorized.
        </p>
        <table>
          <thead>
            <tr>
              <th>Header Name</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>x-consumer-id</td>
              <td>A unique identifier for the consumer. Generally you should ignore this.</td>
            </tr>
            <tr>
              <td>x-consumer-username</td>
              <td>
                This is an identifier for the API caller that you can use to correlate requests from
                the same caller.
              </td>
            </tr>
            <tr>
              <td>x-anonymous-consumer</td>
              <td>
                Indicates that the request has not been authenticated. Boolean, either{' '}
                <code>true</code> or <code>false</code>.
              </td>
            </tr>
          </tbody>
        </table>
        <h3 id="oauth-2.0">OAuth 2.0</h3>
        <p>
          If your API allows 3rd party applications to access Veteran PII or PHI, the Lighthouse
          program requires you to secure your API using OAuth access tokens. This keeps Veterans in
          control of their data by deciding how it can be used. As an API provider, it&apos;s
          ultimately your job to ensure that PII and PHI is protected. The Lighthouse platform can
          aid you in this effort by defining OAuth scopes that your API backend can use to ensure
          that the user has opted into the necessary data access. Just like API keys, any developer
          can register an OAuth client application for use with APIs on{' '}
          <code>sandbox-api.va.gov</code> so you must ensure that the API you publish through{' '}
          <code>sandbox-api.va.gov</code> only provides data for{' '}
          <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/test_accounts.md">
            the test users
          </a>
          .
        </p>
        <p>
          If you&apos;re planning to secure your API by requiring an OAuth access token, you should
          expect to receive the access token in the HTTP <code>Authorization</code> header.
        </p>
        <CodeWrapper>
          Authorization: Bearer
          eyJraWQiOiJUdWZhS3pDWlNENlZiN25Xclg3U1VzUkZXQTRQQkJKZGpodHpxbi1aUEZFIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjlXd1BYc0oyUUxxY0JMaXctMkU3SmEwYUVBd3pjZ0Z3WjFPNi04UkR6RjgiLCJpc3MiOiJodHRwczovL2RlcHR2YS1ldmFsLm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU2OTAxMjI1MSwiZXhwIjoxNTY5MDE1ODUxLCJjaWQiOiIwb2EzNXJsYjhwdEh1bGVGZjJwNyIsInVpZCI6IjAwdTJwOWZhcjRpaERBRVg4MnA3Iiwic2NwIjpbInZldGVyYW5fc3RhdHVzLnJlYWQiLCJvcGVuaWQiLCJwcm9maWxlIl0sInN1YiI6ImNmYTMyMjQ0NTY5ODQxYTA5MGFkOWQyZjA1MjRjZjM4In0.CV8IVz12EXgZhnjXragxhMFUN8aRWL3GbwGzlfDn-OEluae9M1b4TKiy379nkMxEvD4t1wn7CsIZZDSUK_ueEiFBQ6qX2_oNpHeyO6HDYJvydhytDDgJnvXA48nH2WySNXt44U9meCCbNegSRN5siJn0hy7Cj1GoaUd9DYPZbmjB-62yVZ67t7NOVjwW86q12-8KhA3gyJoDjU6qAn0KddgbKxi4R6H3wytH778osqMKLCsED9GVvczT0ZIhPobTzLgOcEwkjIBmkt0cZRx0t79o-Cn5sk4DV3frwQgfUJErRy439YyAR2CHGSTT1xet_eMD1KvH0IXGhZcoEEYO7w
        </CodeWrapper>
        <p>
          The OAuth access token should be validated by submitting it to the Lighthouse token
          validation service. For details on how to use that service, you can consult the{' '}
          <a href="https://sandbox-api.va.gov/internal/auth/docs/v1/validation.json">
            OpenAPI specification
          </a>{' '}
          for the service API.
        </p>
        <h3 id="mixed-authorization">Mixed Authorization</h3>
        <p>
          Some APIs provide functionality that requires an API key alongside other functionality
          that depends on the Veteran consent provided by OAuth. If this describes your API, you can
          still integrate with the Lighthouse API gateway by mixing authorization mechanisms. To mix
          authorization mechanisms you need to publish two APIs, on two separate path prefixes. Each
          API would proxy requests to the same backend URL. Mixing authorization mechanisms is
          riskier than providing separate backends for each category of functionality.
        </p>
        <p>
          This approach requires you to be thoughtful about how API requests are served by your
          backend. The primary risk you&apos;ll encounter is receiving an ambiguous request. That is
          a request that contains both API key auth headers and an <code>Authorization</code> header
          with an access token. In order to best serve API consumers, we require API providers using
          this authorization pattern to reject such ambiguous requests. In the future the API
          gateway may reject these ambiguous requests on your behalf. Thus, allowing such requests
          today may lead you down an unsustainable path, leaving API consumers upset in the future.
        </p>
        <h2 id="next-steps">Next Steps</h2>
        <p>
          If you&apos;re interested in publishing an API on the Lighthouse platform, get in touch by
          emailing us at api@va.gov.
        </p>
      </div>
    </div>
  </section>
);

export default IntegrationGuide;

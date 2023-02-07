/* eslint-disable max-lines */
import React from 'react';

const Modernization = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Modernization Expectations Summary">
      <h3 id="modernization-what-we-provide">What we provide</h3>
      <ul>
        <li>Clarity regarding our API requirements</li>
        <li>Guidance for how to build modern APIs that meet our requirements</li>
      </ul>
      <h3 id="modernization-what-we-need-from-you">What we need from you</h3>
      <ul>
        <li>
          <a href="https://restfulapi.net/soap-vs-rest-apis/">APIs should be RESTful</a>. They
          should not use antiquated request and response formats. Ideal APIs leverage the REST
          architecture (not SOAP), use simple formats like JSON, and do not demand special tooling.
        </li>
        <li>
          <a href="https://restfulapi.net/statelessness/#:~:text=Being%20stateless%20makes%20REST%20APIs,easy%20to%20cache%20as%20well.&amp;text=The%20server%20never%20loses%20track,necessary%20information%20with%20each%20request.">
            APIs should be stateless
          </a>
          . Each API call should include the necessary details required to process it. Session
          management should not be required.
        </li>
        <li>
          <a href="https://restfulapi.net/versioning/">APIs should be versioned</a>.
          Backward-incompatible changes should be published as a separate version. Changes between
          versions should be documented.
        </li>
        <li>
          <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html">
            APIs should be cache-compatible
          </a>
          . Lighthouse will not necessarily cache API responses, but client applications must be
          able to rely on appropriate cache behavior.
        </li>
        <li>
          <a href="https://apiacademy.co/2015/04/api-design-202-architectural-layers/">
            APIs must be compatible with a layered architecture
          </a>{' '}
          since they will be behind the API Gateway.
        </li>
      </ul>
    </div>
  </div>
);

export default Modernization;

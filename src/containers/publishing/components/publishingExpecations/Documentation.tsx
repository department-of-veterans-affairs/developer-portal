/* eslint-disable max-lines */
import React from 'react';

const Documentation = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Documentation Expectations Summary">
      <h3 id="documentation-what-we-provide">What we provide</h3>
      <ul>
        <li>Guidance for making your API documentation clear and easy to understand</li>
        <li>Self-service consumer access to your documentation</li>
        <li>
          Version control that renders the right API documentation for each version of your API
        </li>
      </ul>
      <h3 id="documentation-what-we-need-from-you">What we need from you</h3>
      <p>Adherence to our API documentation standards</p>
      <h3 id="documentation-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>Your API must have an OpenAPI specification.</li>
        <li>
          All APIs on Lighthouse must have full and accurate documentation that is publicly
          available.
        </li>
        <li>Your API documentation cannot be stored in a Word document or on a Sharepoint site.</li>
      </ul>
    </div>
    <p>
      Our API documentation standards ensure comprehensive and intuitive documentation so that
      application developers can more easily:
    </p>
    <ul>
      <li>Learn about and integrate with new APIs</li>
      <li>Identify and correct errors in their application’s interaction with APIs</li>
    </ul>
    <p>
      We will work with you to ensure your documentation meets our standards and publish this
      documentation on our portal, allowing easy access and version control.
    </p>
    <p>
      In order to be added to Lighthouse, an API needs reference material in the form of{' '}
      <a href="https://swagger.io/docs/specification/about/">OpenAPI specification</a>. This should
      include a description of the API’s purpose, helpful context specific to that API, and examples
      that demonstrate use of the API. This cannot be a Word document or stored on any external
      site, such as a Sharepoint. With Lighthouse, no additional documentation is needed outside of
      what is published on the Lighthouse development portal. This makes it easy for consumers to
      integrate with your API and reduces the administrative burden on your team.
    </p>
    <p>
      Even when an API must be restricted to internal VA use, we believe making documentation public
      is valuable both for transparency and because not all developers working on VA projects
      consistently use the VA network.
    </p>
  </div>
);

export default Documentation;

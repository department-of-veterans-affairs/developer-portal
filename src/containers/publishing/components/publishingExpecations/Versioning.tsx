/* eslint-disable max-lines */
import React from 'react';
import { Link } from 'react-router-dom';

const Versioning = (): JSX.Element => (
  <div>
    <div className="feature" role="region" aria-label="Versioning Expectations Summary">
      <h3 id="versioning-what-we-provide">What we provide</h3>
      <ul>
        <li>
          Clear guidance through identifying and publishing breaking and non-breaking changes to
          your API
        </li>
        <li>Support with communication to consumers regarding new versions of your API</li>
        <li>
          Help so that consumers use the latest version of your API, while the old version is
          deprecated and deactivated
        </li>
      </ul>
      <h3 id="versioning-what-we-need-from-you">What we need from you</h3>
      <p>
        Good communication regarding changes to ensure updated API documentation and versioning as
        defined in our policy.
      </p>
      <h3 id="versioning-key-policy-highlights">Key policy highlights</h3>
      <ul>
        <li>We&apos;ll work with you on a versioning policy.</li>
        <li>Any breaking changes to your API must be published as a new version.</li>
        <li>
          We&apos;ll work with you to manage communication of new versions and to deprecate and
          deactivate previous versions.
        </li>
      </ul>
    </div>
    <p>
      Breaking changes to published API versions can be disruptive to consumers, so our policy is to
      ensure breaking changes aren&apos;t published without a major version change.
    </p>
    <p>
      We define a breaking change as any change that might adversely impact a consumer&apos;s use of
      an API. For example, removing an endpoint or field would be classified as a breaking change. A
      non-breaking change is one that does not adversely impact current users of an API, such as
      adding an endpoint or field. Non-breaking changes do not require a new version, but changes
      that could impact consumers&apos; experience or use of an API must have an accompanying{' '}
      <Link to="/release-notes">release note</Link>.
    </p>
    <p>
      Our release notes adhere as closely as possible to the following format. Examples are
      available on our <Link to="/release-notes">release note page</Link>.
    </p>
    <p>[API NAME] [action, such as deprecated, updated parameters, endpoint added, etc]</p>
    <p>[Month DD, YYYY for date posted]</p>
    <p>
      Detailed description of the changes being made. Include the following whenever applicable:
    </p>
    <ul>
      <li>Use terms deprecation and deactivation</li>
      <li>Link to any related policies</li>
      <li>Link to code changes</li>
      <li>
        List date change will be effective. This can be an exact date, such as Month DD, YYYY or an
        anticipated timeframe (such as 1st quarter YYYY or two weeks after a certain action is
        completed. Such as, “Two resources will be added to the Eligibility API two weeks after the
        v0.2 upgrade is released.”)
      </li>
    </ul>
  </div>
);

export default Versioning;

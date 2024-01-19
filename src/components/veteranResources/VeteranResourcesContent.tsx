import React from 'react';
import classNames from 'classnames';

export const VeteranResourcesContent = (): JSX.Element => (
  <>
    <p id="veteran-resources-description">
      Are you looking for Veteran benefits and services information?
    </p>
    <div
      className={classNames(
        'veteran-blue-background-card',
        'vads-u-background-color--primary-alt-lightest',
        'vads-u-padding-x--2',
        'vads-u-padding-bottom--2',
        'vads-u-padding-top--1p5',
        'vads-u-margin-bottom--2',
      )}
    >
      <h2 className="vads-u-font-size--lg vads-u-margin-top--0">
        While we don&apos;t handle Veteran inquiries, you can:
      </h2>
      <ul>
        <li>
          Use the <a href="https://www.va.gov/vso/">Directory of Veteran Services Organizations</a>{' '}
          to find and contact a VSO.
        </li>
        <li>
          Get in touch with us via the{' '}
          <a href="https://www.va.gov/contact-us/">VA Contact Us page</a>.
        </li>
        <li>
          Send the VA a question using the <a href="https://ask.va.gov/">Ask VA page</a>.
        </li>
      </ul>
    </div>
    <p>Not what you&apos;re looking for? Try these other resources.</p>
    <h2 className="vads-u-font-size--h3">Appeals:</h2>
    <p>If you have more questions, you can: </p>
    <ul>
      <li>Call the VA benefits hotline at 800-827-1000.</li>
      <li>
        Check your <a href="https://www.va.gov/claim-or-appeal-status/">appeals status</a>.
      </li>
      <li>
        Use the <a href="https://www.va.gov/vso/">VSO Directory</a> to find and contact a Veterans
        service organization or officer.
      </li>
    </ul>
    <h2 className="vads-u-font-size--h3">My HealtheVet:</h2>
    <p>
      Access your health information by logging into your{' '}
      <a href="https://www.myhealth.va.gov/mhv-portal-web/user-login?redirect=/mhv-portal-web/home">
        MyHealtheVet account
      </a>
      . If you have more questions, you can:
    </p>
    <ul>
      <li>
        <a href="https://www.myhealth.va.gov/mhv-portal-web/web/myhealthevet/contact-mhv">
          Contact MyHealtheVet
        </a>
        .
      </li>
      <li>
        Call the MyHealtheVet support team at 877-327-0022, Monday through Friday, 7:00 a.m. to 7:00
        p.m. (Central Time).
      </li>
    </ul>
    <h2 className="vads-u-font-size--h3">Family and survivor benefits:</h2>
    <p>
      The <a href="https://www.va.gov/family-member-benefits/">VA Family Member Benefits</a> page
      has information about benefits that may fit your needs. If you have more questions, you can:
    </p>
    <ul>
      <li>Call the VA benefits hotline at 800-827-1000.</li>
      <li>
        Use the <a href="https://www.va.gov/vso/">VSO Directory</a> to find and contact a Veterans
        service organization or officer.
      </li>
    </ul>
    <h2 className="vads-u-font-size--h3">VA Forms:</h2>
    <p>
      Find the VA forms you need using <a href="https://www.va.gov/find-forms/">Find a VA Form</a>.{' '}
    </p>
    <h2 className="vads-u-font-size--h3">VA Facilities:</h2>
    <p>
      Find VA facilities near you by using the{' '}
      <a href="https://www.va.gov/find-locations">Find VA Locations</a> service.
    </p>
  </>
);

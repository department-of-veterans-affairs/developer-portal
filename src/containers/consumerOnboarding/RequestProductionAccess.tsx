/* eslint-disable max-lines */
import {
  VaAccordion,
  VaAccordionItem,
  VaAlert,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import './RequestProductionAccess.scss';
import {
  CONSUMER_APPLICATION_PATH,
  CONSUMER_RATE_LIMIT_PATH,
  SUPPORT_CONTACT_PATH,
} from '../../types/constants/paths';

const RequestProductionAccess = (): JSX.Element => (
  <div className="request-production-access">
    <Helmet>
      <title>Request production access</title>
    </Helmet>
    <PageHeader header="Request production access" className="vads-u-margin-bottom--1" />
    <VaAlert status="info" visible uswds>
      <p className="vads-u-margin-y--0">
        In July 2023, we added steps to the production approval process which has significantly
        increased approval time. We appreciate your understanding and cooperation as we prioritize
        the safe and secure delivery of services to Veterans. For questions or concerns,{' '}
        <Link to={SUPPORT_CONTACT_PATH}>contact us</Link>.
      </p>
    </VaAlert>
    <p>Before you start onboarding, it&apos;s good to know that:</p>
    <ul className="vads-u-margin-top--0">
      <li>All consumers must be US-based.</li>
      <li>We do not allow monetizing or selling Veteran data.</li>
      <li>Timeline for getting production access varies.</li>
      <li>
        We encourage all apps and websites to comply with{' '}
        <a href="https://section508.gov/" target="_blank" rel="noreferrer">
          Section 508
        </a>{' '}
      </li>
      <li>
        Our rate limiting is 60 requests per minute. View{' '}
        <Link to={CONSUMER_RATE_LIMIT_PATH}>our rate limiting policy</Link> for more information.
      </li>
    </ul>
    <strong>
      We use the data you submit to determine whether to schedule a demo or request technical or
      policy-related changes. If we need changes, we&apos;ll send you an email.
    </strong>
    <div className="vads-l-grid-container">
      <Link className="vads-c-action-link--green" to={CONSUMER_APPLICATION_PATH}>
        Complete the production access form
      </Link>
      <p>
        <em>The form progress cannot be saved once you begin.</em>
      </p>
    </div>
    <h2 id="form-requirements-production-access">Learn what&apos;s needed on the form</h2>
    <VaAccordion uswds>
      <VaAccordionItem uswds header="Basic information" level={3}>
        <ul className="checklist">
          <li>Company contacts and information</li>
          <li>Notification email address for API status updates</li>
          <li>
            Information about your app and its use cases, including the value it provides to
            Veterans
          </li>
          <li>
            Description of your business model and how your company generates the income to provide
            its service
          </li>
          <li>
            If your app is Veteran-facing:
            <ul>
              <li>
                Information for the app directory, such as key URLs, a brief app description, and a
                list of compatible devices and browsers
              </li>
            </ul>
          </li>
          <li>
            For internal-only APIs, the VASI system name of the application which will consume the
            API
          </li>
        </ul>
        <p className="vads-u-margin-bottom--0">
          <strong>For VA Facilities API:</strong>
        </p>
        <p className="vads-u-margin-top--0">
          If your app uses the <code>PatientWaitTime</code> resource, a screenshot showing it
          displays this or a similar message: To read the FAQ on how wait times are calculated,
          click the &quot;For more information&quot; link on{' '}
          <a
            href="https://www.accesstocare.va.gov/PWT/SearchWaitTimes"
            target="_blank"
            rel="noreferrer"
          >
            this Access To Care page
          </a>
          .
        </p>
      </VaAccordionItem>
      <VaAccordionItem uswds header="Technical information" level={3}>
        <ul className="checklist">
          <li>
            Description of how and where you will provide secure storage of your access credentials,
            such as an API key or client secret and ID
          </li>
          <li>
            Details about why and how your application securely stores or exposes any PHI/PII, if
            applicable
          </li>
          <li>
            Information about security and related procedures, including:
            <ul>
              <li>Safeguards against unauthorized or duplicate requests</li>
              <li>Breach response processes</li>
              <li>Vulnerability management and patch processes</li>
            </ul>
          </li>
          <li>For OAuth APIs, the scopes your application will request</li>
          <li>
            For the Benefits Intake API:
            <ul>
              <li>
                Information about customer&apos;s naming conventions for the source field, if
                applicable
              </li>
              <li>
                Information about whether you maintain a centralized back-end log for submissions
              </li>
            </ul>
          </li>
          <li>
            For the Veterans Health API (FHIR):
            <ul>
              <li>
                Screenshots showing your app has appropriate medical advice disclaimers for Veterans
              </li>
              <li>
                Confirmation that your app is listed on MyHealthApplication.com. (We strongly
                recommend you{' '}
                <a
                  href="https://myhealthapplication.com/list-your-app"
                  target="_blank"
                  rel="noreferrer"
                >
                  register and publish
                </a>{' '}
                your app on this website to show you attest to the{' '}
                <a
                  href="https://www.carinalliance.com/our-work/trust-framework-and-code-of-conduct/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CARIN Alliance Code of Conduct
                </a>
                . Registration is free, and prior to your demo, we will check this website to see if
                your app is listed.)
              </li>
            </ul>
          </li>
        </ul>
      </VaAccordionItem>
      <VaAccordionItem uswds header="Privacy policy and terms of service" level={3}>
        <ul className="checklist">
          <li>URL for your application&apos;s terms of service</li>
          <li>URL for your application&apos;s privacy policy</li>
        </ul>
        <p>
          If your application <strong>uses OAuth</strong>, we will review your terms of service and
          privacy policies to make sure they meet our quality, plain language, and content
          standards. We may require you to make changes to your policies before your demo.
        </p>
        <p>
          Our requirements for privacy policies and terms of service are listed below. We strongly
          suggest you review your policies to make sure they meet these requirements before you
          upload them.
        </p>
        <table>
          <tbody>
            <tr>
              <td>Desktop readability</td>
              <td>
                <ul className="vads-u-margin-y--0">
                  <li>Do the policies have a grade reading level of 12 or below?</li>
                  <li>Are the policies free of obvious typos?</li>
                  <li>
                    Does the text formatting meet the following requirements?
                    <ul>
                      <li>Font size is 14px or larger</li>
                      <li>No long, unbroken paragraphs</li>
                      <li>No ALL-CAPS paragraphs (a sentence or two is OK)</li>
                      <li>No run-on sentences</li>
                      <li>No narrow column widths</li>
                    </ul>
                  </li>
                  <li>
                    Do text and background colors meet minimum{' '}
                    <a
                      href="https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=143#contrast-minimum"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WCAG contrast requirements
                    </a>{' '}
                    of at least 4.5:1?
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Mobile readability</td>
              <td>
                <p className="vads-u-margin-top--0">
                  Does the text formatting meet all of the following requirements for mobile
                  readability?
                </p>
                <ul className="vads-u-margin-bottom--0">
                  <li>Font size is 14px or larger</li>
                  <li>No long, unbroken paragraphs</li>
                  <li>No ALL-CAPS paragraphs (a sentence or two is OK)</li>
                  <li>No run-on sentences</li>
                  <li>No narrow column widths</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Data retention and deletion</td>
              <td>
                <p className="vads-u-margin-top--0">
                  Do your terms of service and/or privacy policies:
                </p>
                <ul className="vads-u-margin-bottom--0">
                  <li>Give users an easy way to request permanent deletion of their data.</li>
                  <li>
                    State that your company will permanently delete 100% of a Veteran&apos;s data,
                    including non-VA data, at the user&apos;s request.
                  </li>
                  <li>
                    State how soon data deletion will happen after the user makes the request. Note:
                    VA requires data deletion to happen within 45 days of the user&apos;s request.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Privacy and data practices</td>
              <td>
                <p className="vads-u-margin-top--0">
                  Do your terms of service and/or privacy policies:
                </p>
                <ul className="vads-u-margin-bottom--0">
                  <li>
                    Define the specific types of data collected, such as geolocation data, financial
                    information, medical information, a user&apos;s contacts, etc.
                  </li>
                  <li>
                    Clearly describe how data will be used, including the sharing of de-identified,
                    anonymized, or pseudonymized data.
                  </li>
                  <li>
                    Name the entities with which data is shared, including third parties, marketers,
                    partners, etc., and clearly indicate how these entities use this data.
                  </li>
                  <li>State that no data is sold, for profit or other monetary transactions.</li>
                  <li>
                    Clearly indicate if data is used for transactions that do not, but could,
                    involve money, such as targeted advertising.
                  </li>
                  <li>
                    Inform users about their data-sharing choices and the risks, benefits, and
                    limitations of data sharing.
                  </li>
                  <li>
                    Address how data sharing could have an impact on others, such as the impact of
                    sharing genetic or family history information.
                  </li>
                  <li>
                    Clearly state that third-party use or disclosure of user information (including
                    de-identified, anonymized, or pseudonymized data) is prohibited for any reason
                    without active consent from the user.
                  </li>
                  <li>
                    Indicate that third parties are bound to the terms and conditions in your
                    privacy policy.
                  </li>
                  <li>
                    Specify that if there is a data breach, you will notify the user and provide
                    instructions for further actions they may take, if any.
                  </li>
                  <li>
                    Specify your data retention policy, including how long you will hold onto data
                    (including non-VA data) if the account is dormant.
                  </li>
                  <li>
                    Include instructions for how the user can permanently delete their data stored
                    with your app/company.
                  </li>
                  <li>
                    Specify what will happen to a user&apos;s data if there is a transfer of
                    ownership or if your company ends or sells its business. You must clearly
                    indicate in your policy that the new company&apos;s policies will align with
                    yours, or provide the user one of these options:
                    <ul>
                      <li>Securely dispose of, transmit, or download their health information.</li>
                      <li>Close their account.</li>
                    </ul>
                  </li>
                  <li>Indicate that you will notify your users of changes in ownership.</li>
                  <li>
                    Specify that you will get active consent from users when changes are made to
                    privacy policies and terms of service.
                  </li>
                  <li>
                    Clearly state how you will get active consent for policy changes and provide
                    users with plain-language summaries of what has changed.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </VaAccordionItem>
    </VaAccordion>
    <p className="vads-u-padding-top--3">
      If you have questions for us, let us know by contacting us through our{' '}
      <Link to={SUPPORT_CONTACT_PATH}>support page</Link>.
    </p>
  </div>
);
export default RequestProductionAccess;

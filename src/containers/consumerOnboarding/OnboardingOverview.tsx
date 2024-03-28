import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PROD_PATH,
  SUPPORT_CONTACT_PATH,
} from '../../types/constants/paths';
import './OnboardingOverview.scss';

const ConsumerOnboardingOverview = (): JSX.Element => (
  <div className="consumer-onboarding-overview">
    <Helmet>
      <title>Consumer Onboarding</title>
    </Helmet>
    <PageHeader header="API Consumer Onboarding" />
    <p>
      Our API consumer onboarding process ensures the quality and security of applications
      integrating with our APIs and data. It may seem complex, but don&apos;t worry—we&apos;re in
      this together and are here to answer your questions each step of the way.
    </p>
    <VaAlert status="info" visible uswds>
      <p className="vads-u-margin-y--0">
        In July 2023, we added steps to the production approval process which has significantly
        increased approval time. We appreciate your understanding and cooperation as we prioritize
        the safe and secure delivery of services to Veterans. For questions or concerns,{' '}
        <Link to={SUPPORT_CONTACT_PATH}>contact us</Link>.
      </p>
    </VaAlert>
    <h2 id="onboarding-steps">Onboarding steps</h2>
    <ol className="process">
      <li className="process-step list-one">
        <strong id="start-developing">Start developing</strong>
        <p>
          Access to our sandbox environment is automatic when you request sandbox access{' '}
          <Link to="/explore">from an API&apos;s overview page</Link>.
        </p>
      </li>
      <li className="process-step list-two">
        <strong id="request-prod-access">Request production access</strong>
        <p>Timeline for getting production access varies.</p>
        <p>
          <Link to={CONSUMER_PROD_PATH}>
            Learn what&apos;s needed on the production access form.
          </Link>
        </p>
      </li>
      <li className="process-step list-three">
        <strong id="demo">Prepare for and complete a demo</strong>
        <p>
          We&apos;ll review your production access request. Any changes we require must be made
          before&nbsp;
          <Link to={CONSUMER_DEMO_PATH}>your demo</Link>. Open data APIs don&apos;t require a demo.
        </p>
      </li>
      <li className="process-step list-four">
        <strong id="receive-prod-access">Receive production access</strong>
        <p>
          After a successful demo, you&apos;ll get production access. Learn more about&nbsp;
          <Link to={CONSUMER_APIS_PATH}>working with our APIs</Link>.
        </p>
      </li>
    </ol>
    <h2>Onboarding timeline</h2>
    <p>
      Production access can be granted within a week for open data APIs or within a month for APIs needing a demo.
    </p>
    <p>
      The speed of onboarding depends on many factors, including how fast we receive information
      from you, scheduling availability for demos (if needed), and how quickly required changes are
      made.
    </p>
    <p>
      Reviewing what we need for onboarding before requesting production access can help you prepare
      to send us the right information. If we require changes, completing them quickly will help you
      get production access sooner.
    </p>
    <h3>Requesting access to the production environment</h3>
    <p>
      Once you submit the production access form, we&apos;ll review your information and notify you
      within about 1 to 2 weeks if there are any changes we need.
    </p>
    <h3>Making any needed changes</h3>
    <p>
      The timeline for this step depends on how many changes are needed and the speed at which your
      team can complete them and notify us.
    </p>
    <h3>Scheduling and completing a demo</h3>
    <p>
      Once the changes are made, we aim to schedule the demo within a week. Demos generally last
      from 30 to 60 minutes. No demo is needed for open data APIs.
    </p>
    <h3>Getting production access</h3>
    <p>
      After the demo is complete and any final items are wrapped up, production access is granted
      within a week.
    </p>
    <h2>About us</h2>
    <p>
      The VA Lighthouse APIs developer portal is your go-to source for VA APIs when you&apos;re
      ready to integrate your app with VA data. We expose VA APIs on our developer portal and
      partner with consumers to ensure VA data is reliable and secure. We never, ever, charge fees.
    </p>
    <p>
      The APIs on our portal must adhere to the highest standards for versioning, security,
      performance, and more. These APIs are created by internal VA teams and vetted through our
      publishing approval process. They follow RESTful standards to create a reliable and consistent
      API ecosystem.
    </p>
    <p>
      The consumer onboarding pages describe how to get started using our APIs so you know what to
      expect each step of the way-from requesting automatic sandbox access to getting approved for
      production, and from troubleshooting to regular maintenance and beyond.
    </p>
  </div>
);

export default ConsumerOnboardingOverview;

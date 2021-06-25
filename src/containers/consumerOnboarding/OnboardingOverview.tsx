import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_SANDBOX_PATH,
} from '../../types/constants/paths';
import './OnboardingOverview.scss';

const ConsumerOnboardingOverview = (): JSX.Element => (
  <div className="consumer-onboarding-overview">
    <Helmet>
      <title>Consumer Onboarding</title>
    </Helmet>
    <PageHeader header="API Consumer Onboarding" />
    <p>
      Our API consumer onboarding process ensures the quality and security of applications integrating
      with our APIs and data. It may seem complex, but don’t worry—we’re in this together and are here
      to answer your questions each step of the way.
    </p>
    <h2 id="onboarding-steps">Onboarding steps</h2>
    <ol className="process" aria-labelledby="onboarding-steps">
      <li className="process-step list-one" aria-labelledby="start-developing">
        <strong id="start-developing">Start developing</strong>
        <p>
          Access to our sandbox environment is automatic when you&nbsp;
          <Link to={CONSUMER_SANDBOX_PATH}>request an API key</Link>.
        </p>
      </li>
      <li className="process-step list-two" aria-labelledby="request-prod-access">
        <strong id="request-prod-access">Request production access</strong>
        <p>
          Getting production access can take less than a week to more than a month, depending on the API.
        </p>
        <p>
          <Link to={CONSUMER_PROD_PATH}>Learn what’s needed on the production access form.</Link>
        </p>
      </li>
      <li className="process-step list-three" aria-labelledby="demo">
        <strong id="demo">Prepare for and complete a demo</strong>
        <p>
          We’ll review your production access request. Any changes we require must be made before&nbsp;
          <Link to={CONSUMER_DEMO_PATH}>your demo</Link>. Open data APIs don’t require a demo.
        </p>
      </li>
      <li className="process-step list-four" aria-labelledby="receive-prod-access">
        <strong id="receive-prod-access">Receive production access</strong>
        <p>
          After a successful demo, you’ll get production access. Learn more about&nbsp;
          <Link to={CONSUMER_APIS_PATH}>working with our APIs</Link>.
        </p>
      </li>
    </ol>
    <h2>Onboarding timeline</h2>
    <p>
      Getting Lighthouse production access can take a week or less for open data APIs or over a month
      for APIs requiring a demo.
    </p>
    <p>
      The speed of onboarding depends on many factors, including how fast we receive information from
      you, scheduling availability for demos (if needed), and how quickly required changes are made.
    </p>
    <p>
      Reviewing what we need for onboarding before requesting production access can help you prepare to
      send us the right information. If we require changes, completing them quickly will help you get
      production access sooner.
    </p>
    <h3>Requesting access to the production environment</h3>
    <p>
      Once you submit the production access form, we’ll review your information and notify you within
      about 1 to 2 weeks if there are any changes we need.
    </p>
    <h3>Making any needed changes</h3>
    <p>
      The timeline for this step depends on how many changes are needed and the speed at which your team
      can complete them and notify us.
    </p>
    <h3>Scheduling and completing a demo</h3>
    <p>
      Once the changes are made, we aim to schedule the demo within a week. Demos generally last from 30
      to 60 minutes. No demo is needed for open data APIs.
    </p>
    <h3>Getting production access</h3>
    <p>
      After the demo is complete and any final items are wrapped up, production access is granted within
      a week.
    </p>
    <h2>About us</h2>
    <p>
      The VA Lighthouse APIs developer portal is your go-to source for VA APIs when you’re ready to
      integrate your app with VA data. We expose VA APIs on our developer portal and partner with
      consumers to ensure VA data is reliable and secure. We never, ever, charge fees.
    </p>
    <p>
      The APIs on our portal must adhere to the highest standards for versioning, security, performance,
      and more. These APIs are created by internal VA teams and vetted through our publishing approval
      process. They follow RESTful standards to create a reliable and consistent API ecosystem.
    </p>
    <p>
      The consumer onboarding pages describe how to get started using our APIs so you know what to expect
      each step of the way–from <Link to={CONSUMER_SANDBOX_PATH}>requesting automatic sandbox access</Link>
      &nbsp;to getting approved for production, and from troubleshooting to regular maintenance and beyond.
    </p>
  </div>
);

export default ConsumerOnboardingOverview;

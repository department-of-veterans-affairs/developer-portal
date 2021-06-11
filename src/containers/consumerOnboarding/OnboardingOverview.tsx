import React from 'react';
import { PageHeader } from '../../components';

const ConsumerOnboardingOverview = (): JSX.Element => (
  <>
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
          Access to our sandbox environment is automatic when you request an API key.
        </p>
      </li>
      <li className="process-step list-two" aria-labelledby="request-prod-access">
        <strong id="request-prod-access">Request production access</strong>
        <p>
          Getting production access can take less than a week to more than a month, depending on the API.
        </p>
        <p>
          Learn what’s needed on the production access form.
        </p>
      </li>
      <li className="process-step list-three" aria-labelledby="demo">
        <strong id="demo">Prepare for and complete a demo</strong>
        <p>
          We’ll review your production access request. Any changes we require must be made before your
          demo. Open data APIs don’t require a demo.
        </p>
      </li>
      <li className="process-step list-four" aria-labelledby="receive-prod-access">
        <strong id="receive-prod-access">Receive production access</strong>
        <p>
          After a successful demo, you’ll get production access. Learn more about working with our APIs.
        </p>
      </li>
    </ol>
    <h2>Onboarding timeline</h2>
    <h2>About us</h2>
  </>
);

export default ConsumerOnboardingOverview;

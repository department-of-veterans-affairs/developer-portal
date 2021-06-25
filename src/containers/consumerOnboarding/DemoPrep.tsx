import classNames from 'classnames';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import { CONSUMER_APIS_PATH } from '../../types/constants/paths';
import './DemoPrep.scss';

const DemoPrep: React.FunctionComponent = () => (
  <div className="demo-prep">
    <Helmet>
      <title>Prepare for a Demo</title>
    </Helmet>
    <PageHeader header="Prepare for and complete a demo" />
    <p>
      Once any required changes are made, we aim to schedule the demo within a week. Demos
      generally last from 30 to 60 minutes. Open data APIs do not require a demo.
    </p>
    <p>
      Completing a successful demo, and making any necessary changes identified during the demo,
      is the final step in your path toward production access.
    </p>
    <p>
      During the demo, the following topics will be demonstrated or discussed:
    </p>
    <ul>
      <li>User flows (your most common use case)</li>
      <li>Data flows or diagrams</li>
      <li>Any open issues and unanswered questions</li>
    </ul>
    <p>
      We’ll provide usability feedback during the demo and also identify any follow-up actions or
      changes, which we’ll communicate to you through email.
    </p>
    <h2 id="api-specific-requirements">
      We may also discuss API-specific needs or topics, depending on which API you’re using.
    </h2>
    <h3>Benefits Intake</h3>
    <ul>
      <li>
        Performing an upload with multiple attachments that progresses to the received status in
        sandbox.
      </li>
      <li>
        Using the <code>/download</code> endpoint to confirm that what is on the server matches the
        payload you uploaded in its entirety.
      </li>
    </ul>
    <h3>Health</h3>
    <ul>
      <li>Do you store health records at all, or only transmit them in session via the API?</li>
      <li>How do you securely transmit and/or store PII/PHI?</li>
      <li>
        Must show this disclaimer: &quot;Service is for educational and informational purposes, not
        clinical decisions.&quot;
      </li>
    </ul>
    <h3>Veteran Verification</h3>
    <p>No special topics.</p>
    <h3>Appeals (internal VA only)</h3>
    <p>No special topics.</p>
    <h3>Loan Guaranty (internal VA only)</h3>
    <p>No special topics.</p>
    <h3>Address Validation (internal VA only)</h3>
    <ul>
      <li>Confirm internal VA or AWS GovCloud application</li>
    </ul>
    <h2
      id="post-demo-tasks"
      className={classNames(
        'vads-u-border-bottom--5px',
        'vads-u-border-color--primary',
        'vads-u-padding-bottom--1',
      )}
    >
      Post-demo tasks
    </h2>
    <p>
      Future technical reviews and usability tests may be conducted if there are updates to your
      application or the API. These reviews are conducted as part of the production API access renewal
      process. Learn more about <Link to={CONSUMER_APIS_PATH}>working with our APIs</Link>.
    </p>
  </div>
);

export default DemoPrep;

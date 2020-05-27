import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function ApplyHeader() {
  return (
    <div>
      <h1 id="apply-header">Apply for VA Lighthouse Developer Access</h1>
      <p className={classNames('usa-font-lead', 'vads-u-font-family--sans', 'vads-u-margin-bottom--2')}>
        This page is the first step towards developing with VA Lighthouse APIs. The keys and/or credentials you will 
        receive are for sandbox development only. When your app is ready to go live, you may&nbsp;
        <Link to="/go-live">request production access</Link>. Please submit the form below and you'll receive an email with
        your API key(s) and/or OAuth credentials, as well as further instructions. Thank you for being a part of our platform.
      </p>
    </div>
  );
}

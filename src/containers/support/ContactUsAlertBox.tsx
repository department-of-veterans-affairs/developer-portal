import React from 'react';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';

export const ContactUsAlertBox = (): JSX.Element => (
  <AlertBox status="info" className="vads-u-margin-bottom--2 vads-u-padding-y--1">
    <p>
      Are you a Veteran or looking for information on behalf of a Veteran?{' '}
      <a href="https://www.va.gov/vso">Contact your local VSO</a> or{' '}
      <a href="https://iris.custhelp.va.gov/app/ask">submit a question</a> to get the help you need.
    </p>
  </AlertBox>
);

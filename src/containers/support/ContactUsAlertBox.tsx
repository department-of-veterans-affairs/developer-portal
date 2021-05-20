import React from 'react';
import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';

export const ContactUsAlertBox = (): JSX.Element => (
  <AlertBox
    status="info"
    className="vads-u-margin-bottom--2 vads-u-padding-y--1"
  >
    <p>Are you a Veteran? Contact your local VSO or visit <a href="https://www.va.gov">VA.gov</a> to get the help you need.</p>
  </AlertBox>
);

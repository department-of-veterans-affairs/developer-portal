import React from 'react';
import { Link } from 'react-router-dom';

export const apiAlerts = [
  {
    content: <>A new version of Appeals Status API (v1) will launch later this year.</>,
    path: '/explore/api/appeals-status',
  },
  {
    content: (
      <>
        Version 1 of the VA Facilities API is launching soon. We will add{' '}
        <Link to="/explore/api/va-facilities/release-notes">release notes</Link> when it&apos;s
        live.
      </>
    ),
    path: '/explore/api/va-facilities',
  },
  {
    content: (
      <>
        Version 0 of the Veteran Confirmation API is deprecated and scheduled for deactivation on
        April 4, 2024. Version 1 of the Veteran Confirmation API is now active.
      </>
    ),
    path: '/explore/api/veteran-confirmation',
  },
  {
    content: (
      <>
        Veteran Service History and Eligibility versions 0 and 1 are deprecated and scheduled for
        deactivation on May 30, 2024. Version 2 is now live.
      </>
    ),
    path: '/explore/api/veteran-service-history-and-eligibility',
  },
];

import React from 'react';
import { Link } from 'react-router-dom';

export const deprecationBannerTargets = [
  {
    content: <>A new version of Appeals Status API (v1) will launch later this year.</>,
    path: '/explore/appeals/docs/appeals',
  },
  {
    content: (
      <>
        Version 1 of the VA Facilities API is launching soon. We will add{' '}
        <Link to="/release-notes/facilities">release notes</Link> when it&apos;s live.
      </>
    ),
    path: '/explore/facilities/docs/facilities',
  },
  {
    content: (
      <>
        Version 0 of the Veteran Confirmation API is deprecated and scheduled for deactivation on
        April 4, 2024. Version 1 of the Veteran Confirmation API is now active.
      </>
    ),
    path: '/explore/verification/docs/veteran_confirmation',
  },
  {
    content: (
      <>
        Veteran Service History and Eligibility versions 0 and 1 are deprecated and scheduled for
        deactivation on May 30, 2024. Version 2 is now live.
      </>
    ),
    path: '/explore/verification/docs/veteran_verification',
  },
];

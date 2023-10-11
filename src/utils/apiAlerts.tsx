import React from 'react';

export const apiAlerts = [
  {
    content: <>A new version of Appeals Status API (v1) will launch later this year.</>,
    path: '/explore/api/appeals-status',
  },
  {
    content: (
      <>
        Version 0 of the VA Facilities API is deprecated and scheduled for deactivation on February
        29, 2024. Version 1 of the VA Facilities API is now active.
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
  {
    content: (
      <>
        The Argonaut Revision of the Patient Health API is deprecated and scheduled for deactivation
        on March 28, 2024. DSTU2 and R4 revisions of the Patient Health API are active.
      </>
    ),
    path: '/explore/api/fhir',
  },
];

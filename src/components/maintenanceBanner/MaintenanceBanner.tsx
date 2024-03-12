import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React from 'react';

export const MaintenanceBanner = (): JSX.Element => {
  const now = new Date();
  const currentEasternTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
  );
  const scheduledEnd = new Date('August 17, 2023 20:15:00 EDT');

  // Extended maintenance
  if (currentEasternTime.getTime() > scheduledEnd.getTime()) {
    return (
      <VaAlert status="warning" visible uswds>
        <p className="vads-u-margin-y--0">
          Scheduled maintenance for VA systems is currently in progress. This maintenance will
          temporarily cause loading errors for parts of this website. We will give updates as they
          become available.
        </p>
      </VaAlert>
    );
  }

  return (
    <VaAlert status="warning" visible uswds>
      <p className="vads-u-margin-y--0">
        VA systems are undergoing maintenance on{' '}
        <span className="vads-u-font-weight--bold">
          Thursday, August 17, 2023 from 8:00 p.m. ET to 8:15 p.m. ET.
        </span>{' '}
        This maintenance will temporarily cause loading errors for parts of this website.
      </p>
    </VaAlert>
  );
};

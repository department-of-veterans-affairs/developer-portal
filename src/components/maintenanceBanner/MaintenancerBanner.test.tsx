import React from 'react';
import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { MaintenanceBanner } from './MaintenanceBanner';

describe('MaintenanceBanner', () => {
  it('should render', async () => {
    render(<MaintenanceBanner />);
    const maintenanceText = /VA systems are undergoing maintenance on/i;
    const extendedMaintenanceText =
      /Scheduled maintenance for VA systems is currently in progress./i;
    const now = new Date();
    const currentEasternTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
    );
    const scheduledEnd = new Date('August 17, 2023 20:15:00 EDT');

    if (currentEasternTime.getTime() > scheduledEnd.getTime()) {
      expect(await screen.findByText(extendedMaintenanceText)).toBeInTheDocument();
    } else {
      expect(await screen.findByText(maintenanceText)).toBeInTheDocument();
    }
  });
});

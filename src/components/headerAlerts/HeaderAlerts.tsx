import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderAlertsProps {
  pathname: string;
}

export const HeaderAlerts = ({ pathname }: HeaderAlertsProps): JSX.Element | null => {
  switch (pathname) {
    case '/explore/api/appeals-status/docs':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            A new version of Appeals Status API (v1) will launch later this year.
          </p>
        </va-alert>
      );
    case '/explore/api/va-facilities/docs':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            Version 1 of the VA Facilities API is launching soon. We will add{' '}
            <Link to="/explore/api/va-facilities/release-notes">release notes</Link> when it&apos;s live.
          </p>
        </va-alert>
      );
    case '/explore/api/veteran-confirmation/docs':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            Version 0 of the Veteran Confirmation API is deprecated and scheduled for deactivation
            on April 4, 2024. Version 1 of the Veteran Confirmation API is now active.
          </p>
        </va-alert>
      );
    default:
      return null;
  }
};

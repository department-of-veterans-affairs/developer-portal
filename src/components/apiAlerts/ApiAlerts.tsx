import React from 'react';
import { useLocation } from 'react-router-dom';
import { apiAlerts } from '../../utils/apiAlerts';

export const ApiAlerts = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      {apiAlerts
        .filter(target => location.pathname.includes(target.path))
        .map(target => (
          <va-alert key={target.path} background-only show-icon status="info" visible>
            <p className="vads-u-margin-y--0">{target.content}</p>
          </va-alert>
        ))}
    </>
  );
};

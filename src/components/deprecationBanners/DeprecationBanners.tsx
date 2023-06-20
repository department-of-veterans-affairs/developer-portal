import React from 'react';
import { useLocation } from 'react-router';
import { deprecationBannerTargets } from '../../utils/deprecationBannerHelper';

export const DeprecationBanners = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      {deprecationBannerTargets
        .filter(target => location.pathname.includes(target.path))
        .map(target => (
          <va-alert key={target.path} background-only show-icon status="info" visible>
            <p className="vads-u-margin-y--0">{target.content}</p>
          </va-alert>
        ))}
    </>
  );
};

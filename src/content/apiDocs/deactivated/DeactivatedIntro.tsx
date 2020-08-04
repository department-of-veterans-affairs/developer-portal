import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import * as React from 'react';

const DeactivatedIntro = () => {
  return (
    <AlertBox
      content={<p>This is a repository for deactivated APIs and related documentation and release notes.</p>}
      status="info"
    />
  );
};

export default DeactivatedIntro;

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import './DeactivatedIntro.scss';

const DeactivatedIntro = () => {
  return (
    <div>
      <div />
      <div>
        <FontAwesomeIcon icon={faInfoCircle} />
        <p>This is a repository for deactivated APIs and related documentation and release notes.</p>
      </div>
    </div>
  );
};

export default DeactivatedIntro;

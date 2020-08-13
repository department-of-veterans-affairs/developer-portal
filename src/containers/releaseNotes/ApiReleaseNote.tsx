import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';

import * as React from 'react';

import { Flag } from 'flag';

import { isApiDeactivated } from '../../apiDefs/deprecated';
import { IApiDescription } from '../../apiDefs/schema';

const ApiReleaseNote = ({ api, flagName }: { api: IApiDescription, flagName: string }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  return (
    <Flag name={`${flagName}.${api.urlFragment}`}>
      <div id={dashUrlFragment}>
        <h2>{api.name}</h2>
        {api.deactivationInfo && isApiDeactivated(api) && (
          <AlertBox
            headline="Deactivated API"
            status="info"
          >
            {api.deactivationInfo.deactivationContent({})}
          </AlertBox>
        )}
        {api.releaseNotes({})}
        <hr />
      </div>
    </Flag>
  );
};

export default ApiReleaseNote;
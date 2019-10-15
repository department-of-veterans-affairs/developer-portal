import * as React from 'react';

import * as flags from '../../../featureFlags/flags';
import { query } from '../../../featureFlags/query';

import { CurlForm } from './CurlForm';

export const WrapParameters = {
  parameters: (Original: any, system: any) => (props: any) => {
    return (
      <div>
        {query(flags.curlForm) ? (
          <CurlForm system={system} operation={props.operation.toJS()} />
        ) : null}
        <Original {...props} />
      </div>
    );
  },
};

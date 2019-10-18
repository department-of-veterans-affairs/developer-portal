import * as React from 'react';

import { CurlForm } from './CurlForm';

export const WrapParameters = {
  parameters: (Original: any, system: any) => (props: any) => {
    return (
      <div>
        <CurlForm system={system} operation={props.operation.toJS()} />
        <Original {...props} />
      </div>
    );
  },
};

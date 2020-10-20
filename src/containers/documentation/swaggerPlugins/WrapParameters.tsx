import * as React from 'react';
import { Operation } from 'swagger-ui';
import { CurlForm } from './CurlForm';
import { ParametersProps, System } from './types';

export const WrapParameters = {
  parameters: (
    Original: React.ComponentType<ParametersProps>,
    system: System,
  ): React.ComponentType<ParametersProps> => {
    const Parameters = (props: ParametersProps) => (
      <div>
        <CurlForm system={system} operation={props.operation.toJS() as Operation} />
        <Original {...props} />
      </div>
    );

    return Parameters;
  },
};

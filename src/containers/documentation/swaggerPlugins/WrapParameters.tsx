import { OrderedMap } from 'immutable';
import * as React from 'react';
import { Operation, SwaggerMapValues } from 'swagger-ui';
import { CurlForm } from './CurlForm';
import { System } from './types';

interface ParametersProps {
  system: System;
  operation: OrderedMap<string, SwaggerMapValues>;
}

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

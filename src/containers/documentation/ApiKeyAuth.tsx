import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { APINameParam } from '../../types';

const ApiKeyAuth = (props: APINameParam): JSX.Element => {
  if (props.apiCategoryKey) {
    return <Redirect to={`/explore/${props.apiCategoryKey}`} />;
  }

  return <Redirect to="/explore" />;
};

export default ApiKeyAuth;

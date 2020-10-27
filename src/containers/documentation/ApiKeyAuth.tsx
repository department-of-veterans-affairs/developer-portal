import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { APINameParam } from '../../types';

const ApiKeyAuth = (props: APINameParam): JSX.Element => {
  if (props.apiCategoryKey == null) {
    return <Redirect to="/explore" />;
  } else {
    return <Redirect to={`/explore/${props.apiCategoryKey}`} />;
  }
};

export default ApiKeyAuth;

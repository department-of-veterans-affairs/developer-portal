import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { IApiNameParam } from '../../types';

const ApiKeyAuth = (props: IApiNameParam): JSX.Element => {
 
  if (props.apiCategoryKey == null) {
    return <Redirect to={`/explore`} />;
  } else {
    return <Redirect to={`/explore/${props.apiCategoryKey}`} />;
  }
  
};

export default ApiKeyAuth;

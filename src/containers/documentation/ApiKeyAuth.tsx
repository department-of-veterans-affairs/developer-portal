import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { IApiNameParam } from '../../types';

export class ApiKeyAuth extends React.Component<IApiNameParam, {}> {
  public render() {
    if (this.props.apiCategoryKey == null) {
      return <Redirect to={`/explore`} />;
    } else {
      return <Redirect to={`/explore/${this.props.apiCategoryKey}`} />;
    }
  }
}

export default ApiKeyAuth;

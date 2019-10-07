import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import { IApiNameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';
import OAuth from './OAuth';

export class AuthorizationDocs extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const category = lookupApiCategory(apiCategoryKey);
    if (category != null) {
      if (category.apiKey === true) {
        return (<ApiKeyAuth apiCategoryKey={apiCategoryKey} />);
      } else {
        return (<OAuth apiCategoryKey={apiCategoryKey} />);
      }
    } else {
      return <Redirect to='/explore/bogus' />;
    }
  }
}


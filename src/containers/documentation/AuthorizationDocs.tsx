import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';
import { IApiNameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';

import './AuthorizationDocs.scss';

export class AuthorizationDocs extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const category = lookupApiCategory(apiCategoryKey);
    if (category != null) {
      if (category.apiKey === true) {
        return (<ApiKeyAuth apiCategoryKey={apiCategoryKey} />);
      } else {
        return (
          <div className="va-api-authorization-docs">
            <PageHeader halo={category.name} header="Authorization" />
            <OAuth />
          </div>
        );
      }
    } else {
      return <Redirect to='/explore/bogus' />;
    }
  }
}


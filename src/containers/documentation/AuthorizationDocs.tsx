/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';
import { IApiNameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = ({ match }: RouteComponentProps<IApiNameParam>): JSX.Element => {

  const { apiCategoryKey } = match.params;
  const category = lookupApiCategory(apiCategoryKey);
  if (category != null) {
    if (category.apis.some(api => !!api.oAuth) && apiCategoryKey !== 'benefits') {
      return (
        <div className="va-api-authorization-docs">
          <PageHeader halo={category.name} header="Authorization" />
          <OAuth />
        </div>
      );
    } else {
      return (<ApiKeyAuth apiCategoryKey={apiCategoryKey} />);
    }
  } else {
    return <Redirect to='/explore/bogus' />;
  }
  
};


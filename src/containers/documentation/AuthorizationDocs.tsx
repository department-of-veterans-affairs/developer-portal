import * as React from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';
import { APINameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const category = lookupApiCategory(apiCategoryKey);
  if (category == null) {
    return <Redirect to="/explore" />;
  }

  if (category.apis.some(api => !!api.oAuth) && apiCategoryKey !== 'benefits') {
    return (
      <div className="va-api-authorization-docs">
        <PageHeader halo={category.name} header="Authorization" />
        <OAuth />
      </div>
    );
  } else {
    return <ApiKeyAuth apiCategoryKey={apiCategoryKey} />;
  }
};

import * as React from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';

import { lookupApiCategory } from '../../apiDefs/query';
import { PageHeader } from '../../components';
import OAuth from '../../content/apiDocs/oauthTechnicalLegacy.mdx';
import { APINameParam } from '../../types';
import ApiKeyAuth from './ApiKeyAuth';

import './AuthorizationDocsLegacy.scss';

export const AuthorizationDocsLegacy = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const category = lookupApiCategory(apiCategoryKey);
  if (category == null) {
    return <Redirect to="/explore" />;
  }

  if (category.apis.some(api => !!api.oAuth) && apiCategoryKey !== 'benefits') {
    return (
      <div className="va-api-authorization-docs-legacy">
        <Helmet>
          <title>Authorization</title>
        </Helmet>
        <PageHeader halo={category.name} header="Authorization" />
        <OAuth />
      </div>
    );
  } else {
    return <ApiKeyAuth apiCategoryKey={apiCategoryKey} />;
  }
};

import * as React from 'react';
import Helmet from 'react-helmet';
import { lookupApiByFragment } from '../../apiDefs/query';

import { PageHeader, BuildingOIDCContent, ScopesContent } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';

import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => {
  const [selectedApi, setSelectedApi] = React.useState('claims');
  const changeSelectedApi = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedApi(event.currentTarget.value);
  };

  const apiDef = lookupApiByFragment(selectedApi);

  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <PageHeader header="Authorization" />
      <PageLinks />
      <GettingStarted />
      <BuildingOIDCContent
        selectedOption={selectedApi}
        onSelectionChange={changeSelectedApi}
        apiDef={apiDef}
      />
      <ScopesContent
        selectedOption={selectedApi}
        onSelectionChange={changeSelectedApi}
        apiDef={apiDef}
      />
      <IdToken />
      <TestUsers />
    </div>
  );
};

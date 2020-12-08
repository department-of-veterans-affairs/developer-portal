import * as React from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';

import { PageHeader, BuildingOIDCContent, CodeWrapper } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';
import Scopes from '../../content/apiDocs/oauth/Scopes.mdx';
import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => {
  const [selectedApi, setSelectedApi] = React.useState('address_validation');
  const changeSelectedApi = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedApi(event.currentTarget.value);
  };

  const oAuthDefs = getAllOauthApis();
  const apiDef = lookupApiByFragment(selectedApi);
  const authUrl = `\`\`\`plaintext\n${apiDef?.oAuthDocs?.authorizationUrl ?? ''}\n\`\`\``;

  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <PageHeader header="Authorization" />
      <PageLinks />
      <GettingStarted />
      <CodeWrapper options={oAuthDefs} selectedOption={selectedApi} onSelectionChange={changeSelectedApi}>
        <ReactMarkdown>{authUrl}</ReactMarkdown>
      </CodeWrapper>

      <BuildingOIDCContent />
      <Scopes />
      <IdToken />
      <TestUsers />
    </div>
  );
};

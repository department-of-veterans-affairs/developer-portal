import * as React from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';

import { CodeWrapper, PageHeader } from '../../components';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';

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
      <CodeWrapper options={oAuthDefs} selectedOption={selectedApi} onSelectionChange={changeSelectedApi}>
        <ReactMarkdown>{authUrl}</ReactMarkdown>
      </CodeWrapper>
      <OAuth />
    </div>
  );
};

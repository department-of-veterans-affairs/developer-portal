import * as React from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { resetApiSelection, ResetAPISelection } from '../../actions';
import { lookupApiByFragment } from '../../apiDefs/query';
import { PageHeader, BuildingOIDCContent, ScopesContent } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';
import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';
import { RootState } from '../../types';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => {
  const selectedApi = useSelector((state: RootState) => state.apiSelection.selectedApi);
  const apiDef = lookupApiByFragment(selectedApi);

  const dispatch: React.Dispatch<ResetAPISelection> = useDispatch();

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => (): void => {
      dispatch(resetApiSelection());
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <PageHeader header="Authorization" />
      <PageLinks />
      <GettingStarted />
      <BuildingOIDCContent apiDef={apiDef} />
      <ScopesContent apiDef={apiDef} />
      <IdToken />
      <TestUsers />
    </div>
  );
};

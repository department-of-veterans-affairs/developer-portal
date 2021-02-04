import { History } from 'history';
import * as React from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  resetOAuthApiSelection,
  ResetOAuthAPISelection,
  setOAuthApiSelection,
  SetOAuthAPISelection,
} from '../../actions';
import { getAllOauthApis } from '../../apiDefs/query';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader, BuildingOIDCContent, ScopesContent } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';
import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';
import { usePrevious } from '../../hooks';
import { RootState } from '../../types';
import { DEFAULT_OAUTH_API_SELECTION } from '../../types/constants';

import './AuthorizationDocs.scss';

const setSearchParam = (
  history: History,
  queryString: string,
  api: string,
  historyPush: boolean,
): void => {
  const params = new URLSearchParams(queryString);
  if (params.get('api') !== api) {
    params.set('api', api);
    if (historyPush) {
      history.push(`${history.location.pathname}?${params.toString()}`);
    }
  }
};

const setInitialApi = (
  history: History,
  searchQuery: string,
  dispatch: React.Dispatch<ResetOAuthAPISelection | SetOAuthAPISelection>,
): void => {
  const params = new URLSearchParams(searchQuery || undefined);
  const apiQuery = params.get('api');
  const availableApis = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));
  const isAnApi = availableApis.some((item: APIDescription) => item.urlFragment === apiQuery);
  const api = apiQuery && isAnApi ? apiQuery.toLowerCase() : DEFAULT_OAUTH_API_SELECTION;
  dispatch(setOAuthApiSelection(api));
  setSearchParam(history, searchQuery, api, false);
};

const AuthorizationDocs = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch: React.Dispatch<ResetOAuthAPISelection | SetOAuthAPISelection> = useDispatch();
  const initializing = React.useRef(true);
  const api = useSelector((state: RootState) => state.oAuthApiSelection.selectedOAuthApi);
  const prevApi = usePrevious(api);

  React.useEffect(() => {
    if (initializing.current) {
      // Do this on first load
      initializing.current = false;

      setInitialApi(history, location.search, dispatch);
    } else {
      // Do this on all subsequent re-renders
      setSearchParam(history, location.search, api, true);
    }
  }, [dispatch, location, history, prevApi, api]);

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => (): void => {
      dispatch(resetOAuthApiSelection());
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
      <BuildingOIDCContent />
      <ScopesContent />
      <IdToken />
      <TestUsers />
    </div>
  );
};

export { AuthorizationDocs };

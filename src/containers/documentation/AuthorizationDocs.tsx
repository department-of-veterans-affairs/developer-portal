import { History, Location } from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetOAuthApiSelection, ResetOAuthAPISelection } from '../../actions';
import { PageHeader, BuildingOIDCContent, ScopesContent } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';
import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';
import { usePrevious } from '../../hooks';
import { RootState } from '../../types';
import { DEFAULT_OAUTH_API_SELECTION } from '../../types/constants';

import './AuthorizationDocs.scss';

interface AuthorizationDocsProps {
  location: Location;
}

const AuthorizationDocsPropTypes = {
  // Leave as any for now until we can use the location react hooks
  location: PropTypes.any.isRequired,
};

const getInitialApi = (searchQuery: string): string => {
  const params = new URLSearchParams(searchQuery || undefined);
  const apiQuery = params.get('api');
  return apiQuery ? apiQuery.toLowerCase() : DEFAULT_OAUTH_API_SELECTION;
};

const setSearchParam = (history: History, queryString: string, api: string): void => {
  const params = new URLSearchParams(queryString);
  if (params.get('api') !== api) {
    params.set('api', api);
    history.push(`${history.location.pathname}?${params.toString()}`);
  }
};

const AuthorizationDocs = (props: AuthorizationDocsProps): JSX.Element => {
  const history = useHistory();
  const { location } = props;
  const dispatch: React.Dispatch<ResetOAuthAPISelection> = useDispatch();
  const initializing = React.useRef(true);
  let api = useSelector((state: RootState) => state.oAuthApiSelection.selectedOAuthApi);
  const prevApi = usePrevious(api);

  if (initializing.current) {
    initializing.current = false;

    api = getInitialApi(location.search);
  }

  /**
   * UPDATES URL WITH CORRECT VERSION PARAM
   */
  React.useEffect(() => {
    if (prevApi !== api) {
      setSearchParam(history, location.search, api);
    }
  }, [history, location.search, prevApi, api]);

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

AuthorizationDocs.propTypes = AuthorizationDocsPropTypes;

export { AuthorizationDocs };

import * as React from 'react';
import Helmet from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import ExplorePage from '../../content/explorePage.mdx';
import { Flag } from '../../flags';
import { APINameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';
import ApiDocumentation from './ApiDocumentation';
import ApiNotFoundPage from './ApiNotFoundPage';

const DeactivationMessage = ({ api }: { api: APIDescription }): JSX.Element | null => {
  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  const content = isDeactivated
    ? (api.deactivationInfo?.deactivationContent ?? ((): string => 'Deactivated API'))
    : (api.deactivationInfo?.deprecationContent ?? ((): string => 'Deprecated API'));
  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-alert-box')}>
      <div className={classNames('usa-alert-body')}>{content({})}</div>
    </div>
  );
};

const getApi = (apiName?: string): APIDescription | null => {
  if (!apiName) {
    return null;
  }

  return lookupApiByFragment(apiName);
};

const ApiPage = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<APINameParam>();

  const api = getApi(params.apiName);
  if (api === null) {
    return <ApiNotFoundPage />;
  }

  const category = lookupApiCategory(params.apiCategoryKey);

  return (
    <Flag name={['enabled', api.urlFragment]} fallbackRender={(): JSX.Element => <ExplorePage />}>
      <div role="region" aria-labelledby={PAGE_HEADER_ID}>
        <Helmet>
          <title>{api.name} Documentation</title>
        </Helmet>
        <PageHeader halo={category?.name} header={api.name} />
        <DeactivationMessage api={api} />
        {!isApiDeactivated(api) && (
          <ApiDocumentation
            apiDefinition={api}
            location={location}
          />
        )}
      </div>
    </Flag>
  );
};

ApiPage.propTypes = {};
export default ApiPage;

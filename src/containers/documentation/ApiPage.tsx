import classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';
import ExplorePage from '../../content/explorePage.mdx';
import { Flag } from '../../flags';
import { APINameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';
import ApiDocumentation from './ApiDocumentation';

const DeactivationMessage = ({ api }: { api: APIDescription }) => {
  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  const content = isDeactivated
    ? (api.deactivationInfo?.deactivationContent || (() => 'Deactived API'))
    : (api.deactivationInfo?.deprecationContent || (() => 'Deprecated API'));
  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-deprecation-alert')}>
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

const ApiPage = (props: RouteComponentProps<APINameParam>): JSX.Element => {
  const { params } = props.match;

  const api = getApi(params.apiName);
  if (api === null) {
    return <ExplorePage />;
  }

  const category = lookupApiCategory(params.apiCategoryKey);

  return (
    <Flag name={['enabled', api.urlFragment]} fallbackRender={() => <ExplorePage />}>
      <div role="region" aria-labelledby={PAGE_HEADER_ID}>
        <PageHeader halo={category?.name} header={api.name} />
        <DeactivationMessage api={api} />
        {!isApiDeactivated(api) && (
          <ApiDocumentation
            apiDefinition={api}
            categoryKey={params.apiCategoryKey}
            location={props.location}
          />
        )}
      </div>
    </Flag>
  );
};

ApiPage.propTypes = {};
export default ApiPage;

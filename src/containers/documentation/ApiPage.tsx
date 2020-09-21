import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';
import ExplorePage from '../../content/explorePage.mdx';
import { IApiNameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';
import ApiDocumentation from './ApiDocumentation';

const DeactivationMessage = ({ api }: { api: IApiDescription }) => {
  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  const content = isDeactivated
    ? api.deactivationInfo!.deactivationContent
    : api.deactivationInfo!.deprecationContent;
  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-deprecation-alert')}>
      <div className={classNames('usa-alert-body')}>{content({})}</div>
    </div>
  );
};

export default class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>> {
  public render() {
    const { params } = this.props.match;
    const api = this.getApi();
    if (api === null) {
      return <ExplorePage />;
    }

    const category = lookupApiCategory(params.apiCategoryKey)!;
    return (
      <Flag name={`enabled.${api.urlFragment}`} fallbackComponent={ExplorePage}>
        <div role="region" aria-labelledby={PAGE_HEADER_ID}>
          <PageHeader halo={category.name} header={api.name} />
          <DeactivationMessage api={api} />
          {!isApiDeactivated(api) && (
            <ApiDocumentation
              apiDefinition={api}
              categoryKey={params.apiCategoryKey}
              location={this.props.location}
            />
          )}
        </div>
      </Flag>
    );
  }

  private getApi(): IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }
}

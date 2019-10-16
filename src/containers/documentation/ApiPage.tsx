import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { isApiDeprecated } from '../../apiDefs/deprecated';
import { lookupApiByFragment, lookupApiCategory } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';
import ExplorePage from '../../content/explorePage.mdx';
import { IApiNameParam } from '../../types';
import ApiDocumentation from './ApiDocumentation';

const DeprecationMessage = ({ api } : { api: IApiDescription }) => {
  return api.deprecationContent ? (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-deprecation-alert')}>
      <div className={classNames('usa-alert-body')}>
        {api.deprecationContent({})}
      </div>
    </div>
    ) : null;
};

export default class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>> {
  public render() {
    const { params } = this.props.match;
    const api = this.getApi();
    if (api === null) {
      return <ExplorePage />;
    }

    const isDeprecated = isApiDeprecated(api);
    const category = lookupApiCategory(params.apiCategoryKey)!;
    return (
      <Flag name={`enabled.${api.urlFragment}`} fallbackComponent={ExplorePage}>
        <div role="region" aria-labelledby="api-documentation">
          <PageHeader id="api-documentation" halo={category.name} header={api.name} />
          <DeprecationMessage api={api} />
          {!isDeprecated &&
            <ApiDocumentation
              apiDefinition={api}
              categoryKey={params.apiCategoryKey}
              location={this.props.location} />
          }
        </div>
      </Flag>
    );
  }

  private getApi() : IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }
}

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { IApiDescription, lookupApiByFragment, lookupApiCategory } from '../../apiDefs';
import { isApiDeprecated } from '../../apiDefs/deprecated';
import PageHeader from '../../components/PageHeader';
import ExplorePage from '../../content/explorePage.mdx';
import { IApiNameParam } from '../../types';
import ApiDocumentation from './ApiDocumentation';

const DeprecationMessage = ({ api } : { api: IApiDescription }) => {
  return api.deprecationContent ?(
    <div className="usa-alert usa-alert-info">
      <div className="usa-alert-body">
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
    const category = lookupApiCategory(this.props.match.params.apiCategoryKey)!;
    return (
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
    );
  }

  private getApi() : IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }
}

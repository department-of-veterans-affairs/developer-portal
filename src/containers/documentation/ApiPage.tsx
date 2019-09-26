import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { IApiDescription, lookupApiByFragment } from '../../apiDefs';
import { isApiDeprecated } from '../../apiDefs/deprecated';
import ExplorePage from '../../content/explorePage.mdx';
import { IApiNameParam } from '../../types';
import ApiDocumentation from './ApiDocumentation';
import DeprecatedApi from './DeprecatedApi';

export default class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>> {
  public render() {
    const api = this.getApi();
    if (api === null) {
      return <ExplorePage />;
    }

    if (isApiDeprecated(api)) {
      return <DeprecatedApi apiDefinition={api} categoryKey={this.props.match.params.apiCategoryKey} />;
    }

    return (
      <Flag name={`hosted_apis.${api.urlFragment}`}>
        <ApiDocumentation apiDefinition={api} categoryKey={this.props.match.params.apiCategoryKey} location={this.props.location} />
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

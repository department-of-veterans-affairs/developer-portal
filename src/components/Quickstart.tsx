import * as React from 'react';

import { RouteComponentProps } from 'react-router';

import { apiDefs } from '../apiDefs';
import { IApiNameParam } from '../types';
import PageHeader from './PageHeader';

export class Quickstart extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const { quickstart, properName } = apiDefs[apiCategoryKey];

    return (
      <div role="region" aria-labelledby="api-documentation">
        <PageHeader halo={properName} header="Quickstart" />
        {quickstart && quickstart({})}
      </div>
    );
  }
}

import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

import { apiDefs } from '../apiDefs';
import QuickstartWrapper from '../components/QuickstartWrapper'
import { IApiNameParam } from '../types';

export default class QuickstartPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const { content, properName } = apiDefs[apiCategoryKey];
    const { quickstart: quickstartContent } = content;

    if (quickstartContent) {
      return <QuickstartWrapper halo={properName} quickstartContent={quickstartContent} />;
    } else {
      return <Redirect to={`/explore/${apiCategoryKey}`} />;
    }
  }
}

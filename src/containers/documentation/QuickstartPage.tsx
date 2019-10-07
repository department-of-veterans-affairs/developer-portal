import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import QuickstartWrapper from '../../components/QuickstartWrapper';
import { IApiNameParam } from '../../types';

export default class QuickstartPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const { 
      content: { quickstart: quickstartContent }, 
      properName,
    } = getApiDefinitions()[apiCategoryKey];

    if (quickstartContent) {
      return <QuickstartWrapper halo={properName} quickstartContent={quickstartContent} />;
    } else {
      return <Redirect to={`/explore/${apiCategoryKey}`} />;
    }
  }
}

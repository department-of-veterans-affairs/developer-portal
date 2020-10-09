import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import QuickstartWrapper from '../../components/QuickstartWrapper';
import { APINameParam } from '../../types';

export default class QuickstartPage extends React.Component<RouteComponentProps<APINameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const {
      content: { quickstart: quickstartContent },
      name,
    } = getApiDefinitions()[apiCategoryKey];

    if (quickstartContent) {
      return <QuickstartWrapper halo={name} quickstartContent={quickstartContent} />;
    } else {
      return <Redirect to={`/explore/${apiCategoryKey}`} />;
    }
  }
}

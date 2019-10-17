import { Flag } from 'flag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';

function cards(parent: string): JSX.Element[] {
  const apiDefs = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();
  const hasReleaseNotes = (categoryKey: string) => !!apiDefs[categoryKey].content.releaseNotes;

  return apiCategoryOrder.filter(hasReleaseNotes).map((apiCategoryKey: string) => {
    const { name, content } = apiDefs[apiCategoryKey];
    const cardUrl = parent + '/' + apiCategoryKey;
    return (
      <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
        <CardLink name={name} url={cardUrl}>
          {content.shortDescription}
        </CardLink>
      </Flag>
    );
  });
}

export default class Overview extends React.Component<RouteComponentProps & any, {}> {
  public render() {
    return (
      <div>
        <PageHeader
          halo={this.props.halo}
          header={this.props.header}
          description={this.props.description}
        />
        <div className="va-api-container">{cards(this.props.parent)}</div>
      </div>
    );
  }
}

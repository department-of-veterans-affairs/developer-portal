import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { apiCategoryOrder, apiDefs } from '../apiDefs';
import CardLink from '../components/CardLink';
import PageHeader from '../components/PageHeader';

function cards(parent: string): any {
  return apiCategoryOrder.map((apiCategoryKey: string) => {
    const { name, shortDescription } = apiDefs[apiCategoryKey];
    const cardUrl = parent + '/' + apiCategoryKey;
    let apiCard;
    if (apiDefs[apiCategoryKey].releaseNotes) {
      apiCard = (
        <CardLink name={name} key={apiCategoryKey} url={cardUrl}>
          {shortDescription}
        </CardLink>
      );
    }
    return apiCard;
  });
}

export default class Overview extends React.Component<RouteComponentProps & any, {}> {
  public render() {
    return (
      <div className="overview">
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

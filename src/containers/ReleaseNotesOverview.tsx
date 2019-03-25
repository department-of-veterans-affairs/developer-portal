import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { apiCategoryOrder, apiDefs } from '../apiDefs';
import ApiCard from '../components/ApiCard';
import PageHeader from '../components/PageHeader';

export default class Overview extends React.Component<RouteComponentProps & any, {}> {
  public render() { 
    return (
      <div className="overview">
        <PageHeader halo={this.props.halo} header={this.props.header} description={this.props.description} />
        <div className="va-api-container">
          {apiCategoryOrder.map((apiCategoryKey: string) => {
            const { name, shortDescription } = apiDefs[apiCategoryKey];
            const cardUrl = this.props.parent + '/' + apiCategoryKey;
            let apiCard;
            if (apiDefs[apiCategoryKey].releaseNotes) {
              apiCard = (
                <ApiCard name={name} description={shortDescription} key={apiCategoryKey} vaInternalOnly={false}
                  url={cardUrl} />
              );
            }
            return apiCard;
          })}
        </div>
      </div>
    );
  }
}
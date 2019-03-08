import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { apiCategoryOrder, apiDefs } from '../apiDefs';
import ApiCard from '../components/ApiCard';

export default class DocumentationOverview extends React.Component<RouteComponentProps, {}> {
  public render() {
    return (
      <div className="doc-overview">
        <h1>Documentation</h1>
        <h2>
          Explore usage policies and technical details about VA's API offerings.
        </h2>
        <div className="va-api-container">
          {apiCategoryOrder.map((apiCategoryKey: string) => {
            const { name, shortDescription } = apiDefs[apiCategoryKey];
            return (
              <ApiCard name={name} description={shortDescription} key={apiCategoryKey} vaInternalOnly={false}
                  url={`/explore/${apiCategoryKey}`} />
            );
          })}
        </div>
      </div>
    );
  }
}
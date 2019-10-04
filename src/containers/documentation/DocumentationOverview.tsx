import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';

export default class DocumentationOverview extends React.Component<RouteComponentProps, {}> {
  public render() {
    const apiDefinitions = getApiDefinitions();
    const apiCategoryOrder = getApiCategoryOrder();

    return (
      <div className="doc-overview">
        <PageHeader
          header="Documentation"
          description="Explore usage policies and technical details about VA's API offerings."
        />
        <div className="va-api-container">
          {apiCategoryOrder.map((apiCategoryKey: string) => {
            const { name, content } = apiDefinitions[apiCategoryKey];
            return (
              <CardLink name={name} key={apiCategoryKey} url={`/explore/${apiCategoryKey}`}>
                {content.shortDescription}
              </CardLink>
            );
          })}
        </div>
      </div>
    );
  }
}

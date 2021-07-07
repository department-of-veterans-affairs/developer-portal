import * as React from 'react';
import { Helmet } from 'react-helmet';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { AuthorizationCard, CardLink, PageHeader } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { FLAG_CATEGORIES } from '../../types/constants';

const DocumentationOverview = (): JSX.Element => {
  const apiDefinitions = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();

  return (
    <div>
      <Helmet>
        <title>Documentation</title>
      </Helmet>
      <PageHeader
        header="Documentation"
        description="Explore usage policies and technical details about VA's API offerings."
      />
      <div className={defaultFlexContainer()}>
        <AuthorizationCard />
        {apiCategoryOrder.map((apiCategoryKey: string) => {
          const { name, content } = apiDefinitions[apiCategoryKey];
          return (
            <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
              <CardLink name={name} url={`/explore/${apiCategoryKey}`}>
                {content.shortDescription}
              </CardLink>
            </Flag>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentationOverview;

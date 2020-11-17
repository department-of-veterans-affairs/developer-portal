import * as React from 'react';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { AuthorizationCard, CardLink, PageHeader } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { FLAG_AUTH_DOCS_V2 } from '../../types/constants';

const DocumentationOverview = (): JSX.Element => {
  const apiDefinitions = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();

  return (
    <div>
      <PageHeader
        header="Documentation"
        description="Explore usage policies and technical details about VA's API offerings."
      />
      <div className={defaultFlexContainer()}>
        <Flag name={[FLAG_AUTH_DOCS_V2]}>
          <AuthorizationCard />
        </Flag>
        {apiCategoryOrder.map((apiCategoryKey: string) => {
          const { name, content } = apiDefinitions[apiCategoryKey];
          return (
            <Flag name={['categories', apiCategoryKey]} key={apiCategoryKey}>
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

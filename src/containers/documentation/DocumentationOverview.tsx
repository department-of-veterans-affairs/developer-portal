import * as React from 'react';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { CardLink } from '../../components';
import PageHeader from '../../components/PageHeader';
import { Flag } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';

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

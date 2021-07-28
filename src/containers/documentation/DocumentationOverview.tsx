import * as React from 'react';
import { Helmet } from 'react-helmet';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { CardLink, PageHeader } from '../../components';
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
        <CardLink name="Authorization" url="/explore/authorization" callToAction="Learn more about OAuth">
          Use the OpenID Connect standard to allow Veterans to authorize third-party application to
          access data on their behalf.
        </CardLink>
        {apiCategoryOrder.map((apiCategoryKey: string) => {
          const { name, content } = apiDefinitions[apiCategoryKey];
          return (
            <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
              <CardLink
                name={name}
                url={`/explore/${apiCategoryKey}`}
                callToAction={`View the ${name}`}
              >
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

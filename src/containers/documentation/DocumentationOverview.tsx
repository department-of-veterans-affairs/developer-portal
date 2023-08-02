import * as React from 'react';
import { Helmet } from 'react-helmet';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { CardLink, PageHeader } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { FLAG_CATEGORIES } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';

const DocumentationOverview = (): JSX.Element => {
  const apiDefinitions = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();

  return (
    <div className="documentation-overview-wrapper">
      <Helmet>
        <title>Documentation</title>
      </Helmet>
      <PageHeader header="Documentation" />
      <p className="vads-u-font-size--lg vads-u-font-weight--bold vads-u-margin-y--2">
        Explore usage policies and technical details about VA&apos;s API offerings.
      </p>
      <ApisLoader>
        <div className={defaultFlexContainer()}>
          <CardLink
            name="Authorization"
            url="/explore/authorization"
            callToAction="View the Authorization Docs"
          >
            Use the OpenID Connect standard to allow Veterans to authorize third-party applications
            to access data on their behalf.
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
      </ApisLoader>
    </div>
  );
};

export default DocumentationOverview;

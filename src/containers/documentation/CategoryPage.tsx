import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import * as React from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import { Flag, useFlag } from '../../flags';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { AuthorizationCard, CardLink, OnlyTags, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { FLAG_AUTH_DOCS_V2, FLAG_HOSTED_APIS, PAGE_HEADER_ID } from '../../types/constants';

const CategoryPage = (): JSX.Element => {
  const authDocsV2 = useFlag([FLAG_AUTH_DOCS_V2]);
  const { apiCategoryKey } = useParams<APINameParam>();

  const {
    apis,
    name: categoryName,
    content: { intro, overview, veteranRedirect },
  } = getApiDefinitions()[apiCategoryKey];

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: APIDescription) => {
      const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
      return (
        <Flag key={name} name={[FLAG_HOSTED_APIS, urlFragment]}>
          <CardLink
            name={name}
            subhead={
              vaInternalOnly || trustedPartnerOnly ? (
                <OnlyTags {...{ trustedPartnerOnly, vaInternalOnly }} />
              ) : undefined
            }
            url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
          >
            {description}
          </CardLink>
        </Flag>
      );
    });

    const authCard =
      apis.some(api => !!api.oAuth) && categoryName !== 'Benefits API' && !authDocsV2 ? (
        <AuthorizationCard categoryKey={apiCategoryKey} />
      ) : null;

    cardSection = (
      <div role="navigation" aria-labelledby={PAGE_HEADER_ID}>
        <div className={defaultFlexContainer()}>
          {authCard}
          {apiCards}
        </div>
      </div>
    );
  }

  return (
    <div className="va-api-api-overview">
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <PageHeader header={categoryName} />
      {intro({})}
      {cardSection}
      <div className="vads-u-width--full">{overview({})}</div>
      <hr />
      {veteranRedirect && (
        <AlertBox status="info" key={apiCategoryKey}>
          {veteranRedirect.message}&nbsp;
          <a href={veteranRedirect.linkUrl}>{veteranRedirect.linkText}</a>.
        </AlertBox>
      )}
    </div>
  );
};

export default CategoryPage;

import * as React from 'react';
import { useParams } from 'react-router';
import { Flag } from '../../flags';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { AuthorizationCard, CardLink, OnlyTags } from '../../components';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();

  const {
    apis,
    name: categoryName,
    content: { intro, overview },
  } = getApiDefinitions()[apiCategoryKey];

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: APIDescription) => {
      const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
      return (
        <Flag key={name} name={['hosted_apis', urlFragment]}>
          <CardLink
            name={name}
            subhead={
              vaInternalOnly || trustedPartnerOnly ? (
                <OnlyTags {...{ vaInternalOnly, trustedPartnerOnly }} />
              ) : (
                undefined
              )
            }
            url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
          >
            {description}
          </CardLink>
        </Flag>
      );
    });

    const authCard =
      apis.some(api => !!api.oAuth) && categoryName !== 'Benefits API' ? (
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
    <section role="region" aria-labelledby={PAGE_HEADER_ID} className="va-api-api-overview">
      <PageHeader header={categoryName} />
      {intro({})}
      {cardSection}
      <div className="vads-u-width--full">{overview({})}</div>
      <hr />
    </section>
  );
};

export default CategoryPage;

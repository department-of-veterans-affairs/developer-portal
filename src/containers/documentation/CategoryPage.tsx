/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import { AuthorizationCard } from '../../components';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';

const CategoryPage = ({ match }: RouteComponentProps<IApiNameParam>): JSX.Element => {
  
  const { apiCategoryKey } = match.params;
  const {
    apis,
    name: categoryName,
    content: { intro, overview },
  } = getApiDefinitions()[apiCategoryKey];

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: IApiDescription) => {
      const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
      return (
        <Flag key={name} name={`hosted_apis.${urlFragment}`}>
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
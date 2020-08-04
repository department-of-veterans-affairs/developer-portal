import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import AuthorizationCard from '../../components/AuthorizationCard';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

export default class CategoryPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const {
      apis,
      name: categoryName,
      content: { intro, overview },
    } = getApiDefinitions()[apiCategoryKey];

    let cardSection;
    const headerId = `${apiCategoryKey}-overview`;
    if (apis.length > 0) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;

        const flagName = apiCategoryKey === 'deactivated' ? `deactivated_apis.${urlFragment}` : `hosted_apis.${urlFragment}`;
        return (
          <Flag key={name} name={flagName}>
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

      const authCard = apis.some(api => !!api.oAuth) && categoryName !== 'Benefits API' && apiCategoryKey !== 'deactivated' ? <AuthorizationCard categoryKey={apiCategoryKey} /> : null;

      cardSection = (
        <div role="navigation" aria-labelledby={headerId}>
          <div className={defaultFlexContainer()}>
            {authCard}
            {apiCards}
          </div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={headerId} className="va-api-api-overview">
        <PageHeader id={headerId} header={categoryName} />
        {intro({})}
        {cardSection}
        <div className="vads-u-width--full">{overview({})}</div>
        <hr />
      </section>
    );
  }
}

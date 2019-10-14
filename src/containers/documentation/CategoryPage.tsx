import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import AuthorizationCard from '../../components/AuthorizationCard';
import CardLink from '../../components/CardLink';
import VAInternalOnlyTag from '../../components/VAInternalOnlyTag';
import { IApiNameParam } from '../../types';

export default class CategoryPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const {
      apiKey,
      apis,
      name: categoryName,
      content: { intro, overview },
    } = getApiDefinitions()[apiCategoryKey];

    let cardSection;
    const headerId = `${apiCategoryKey}-overview`;
    if (apis.length > 0) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly } = apiDesc;
        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <CardLink
              name={name}
              subhead={vaInternalOnly ? <VAInternalOnlyTag /> : undefined}
              url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      const authCard = apiKey ? null : <AuthorizationCard categoryKey={apiCategoryKey} />;

      cardSection = (
        <div role="navigation" aria-labelledby={headerId}>
          <div className="va-api-container">
            {authCard}
            {apiCards}
          </div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={headerId} className="api-overview">
        <h1 id={headerId}>{categoryName}</h1>
        {intro({})}
        {cardSection}
        <div className="vads-u-width--full">{overview({})}</div>
        <hr />
      </section>
    );
  }
}

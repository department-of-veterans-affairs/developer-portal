import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { apiDefs, IApiDescription } from '../apiDefs';
import { IApiNameParam } from '../types';
import AuthorizationCard from './AuthorizationCard';
import CardLink from './CardLink';

export class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const {
      apiKey,
      apis,
      name: categoryName,
      content: {
        intro,
        overview,
      },
    } = apiDefs[apiCategoryKey];

    let cardSection;
    const headerId = `${apiCategoryKey}-overview`;
    if (apis.length > 0) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly } = apiDesc;
        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <CardLink name={name} description={description} vaInternalOnly={vaInternalOnly}
                url={`/explore/${apiCategoryKey}/docs/${urlFragment}`} />
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
      <section role="region" aria-labelledby={headerId} className={classNames('usa-section','api-overview')} >
        <h1 id={headerId}>{categoryName}</h1>
        {intro({})}
        {cardSection}
        <div className="usa-width-one-whole">
          {overview({})}
        </div>
        <hr />
      </section>
    );
  }
}

import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { apiDefs, IApiDescription } from '../apiDefs';
import { IApiNameParam } from '../types';
import ApiCard from './ApiCard';
import AuthorizationCard from './AuthorizationCard';

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

    if (apis.length > 0) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly } = apiDesc;
        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <ApiCard name={name} description={description} vaInternalOnly={vaInternalOnly}
                url={`/explore/${apiCategoryKey}/docs/${urlFragment}`} />
          </Flag>
        );
      });

      const authCard = apiKey ? null : <AuthorizationCard categoryKey={apiCategoryKey} />;

      cardSection = (
        <div role="navigation" aria-label={`${apiCategoryKey} APIs`}>
          <div className="va-api-container">
            {authCard}
            {apiCards}
          </div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={`${apiCategoryKey}-overview`} className={classNames('usa-section','api-overview')} >
        <h1 id={`${apiCategoryKey}-overview`}>{categoryName}</h1>
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

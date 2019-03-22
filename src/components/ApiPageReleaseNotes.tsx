import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { apiDefs, IApiDescription } from '../apiDefs';
import PageHeader from '../components/PageHeader';
import { IApiNameParam } from '../types';
import ApiCard from './ApiCard';

export class ApiPageReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {

  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const { apis, releaseNotes } = apiDefs[apiCategoryKey];

    const headerProps = {
      halo: 'Release Notes',
      header: apiDefs[apiCategoryKey].properName, 
    };

    let cardSection;

    if (apis.length > 1) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { name, shortDescription, urlFragment, vaInternalOnly } = apiDesc;
        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <ApiCard name={name} description={shortDescription} vaInternalOnly={vaInternalOnly}
                url={`/release-notes/${apiCategoryKey}#${urlFragment}`} />
          </Flag>
        );
      });

      cardSection = (
        <div role="navigation" aria-labelledby={`${apiCategoryKey}-overview-apis`}>
          <div className="va-api-container">
            {apiCards}
          </div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={`${apiCategoryKey}-release-notes`} className="usa-section">
        <PageHeader halo={headerProps.halo} header={headerProps.header} />
        {cardSection}
        <div className="usa-width-one-whole api-release-notes">
          {releaseNotes({})}
        </div>
        <hr />
      </section>
    );
  }
}

import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { apiDefs, IApiDescription } from '../apiDefs';
import PageHeader from '../components/PageHeader';
import { IApiNameParam } from '../types';
import CardLink from './CardLink';
import { VAInternalOnlyTag } from './VAInternalOnlyTag';

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
        const { description, name, urlFragment, vaInternalOnly } = apiDesc;
        const dashUrlFragment = urlFragment.replace('_', '-');

        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <CardLink
              name={name}
              subhead={vaInternalOnly ? VAInternalOnlyTag() : undefined}
              url={`/release-notes/${apiCategoryKey}#${dashUrlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      cardSection = (
        <div role="navigation" aria-labelledby={`${apiCategoryKey}-overview-apis`}>
          <div className="va-api-container">{apiCards}</div>
        </div>
      );
    }

    return (
      <section
        role="region"
        aria-labelledby={`${apiCategoryKey}-release-notes`}
        className="usa-section"
      >
        <PageHeader halo={headerProps.halo} header={headerProps.header} />
        {cardSection}
        <div className="usa-width-one-whole api-release-notes">
          {releaseNotes ? releaseNotes({}) : null}
        </div>
        <hr />
      </section>
    );
  }
}

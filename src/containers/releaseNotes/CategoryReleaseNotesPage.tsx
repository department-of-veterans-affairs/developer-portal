import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';
import VAInternalOnlyTag from '../../components/VAInternalOnlyTag';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

export default class CategoryReleaseNotesPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const apiDefs = getApiDefinitions();
    const { apiCategoryKey } = this.props.match.params;
    const { apis, content } = apiDefs[apiCategoryKey];

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
              subhead={vaInternalOnly ? <VAInternalOnlyTag /> : undefined}
              url={`/release-notes/${apiCategoryKey}#${dashUrlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      cardSection = (
        <div role="navigation" aria-labelledby={`${apiCategoryKey}-overview-apis`}>
          <div className={defaultFlexContainer()}>{apiCards}</div>
        </div>
      );
    }

    return (
      <section
        role="region"
        aria-labelledby={`${apiCategoryKey}-release-notes`}
      >
        <PageHeader halo={headerProps.halo} header={headerProps.header} />
        {cardSection}
        <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
          {content.releaseNotes ? content.releaseNotes({}) : null}
        </div>
        <hr />
      </section>
    );
  }
}

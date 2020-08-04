import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

const ApiReleaseNote = ({ api, apiCategoryKey }: { api: IApiDescription, apiCategoryKey: string }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  const flagName = apiCategoryKey === 'deactivated' ? `deactivated_apis.${api.urlFragment}` : `hosted_apis.${api.urlFragment}`;
  return (
    <Flag name={flagName}>
      <div id={dashUrlFragment}>
        <h2>{api.name}</h2>
        {api.releaseNotes({})}
        <hr />
      </div>
    </Flag>
  );
};

export default class CategoryReleaseNotesPage extends React.Component<
  RouteComponentProps<IApiNameParam>
> {
  public render() {
    const apiDefs = getApiDefinitions();
    const { apiCategoryKey } = this.props.match.params;
    const { apis } = apiDefs[apiCategoryKey];

    let cardSection;
    if (apis.length > 1) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
        const dashUrlFragment = urlFragment.replace('_', '-');

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
              url={`/release-notes/${apiCategoryKey}#${dashUrlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      cardSection = (
        <div role="navigation" aria-labelledby={`${apiCategoryKey}-release-notes`}>
          <div className={defaultFlexContainer()}>{apiCards}</div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={`${apiCategoryKey}-release-notes`}>
        <PageHeader
          halo={apiDefs[apiCategoryKey].name}
          header="Release Notes"
          id={`${apiCategoryKey}-release-notes`}
        />
        {cardSection}
        <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
          {apis.map(api => (
            <React.Fragment>
              {this.renderDeactivatedNotice(api)}
              <ApiReleaseNote
                apiCategoryKey={apiCategoryKey}
                key={api.urlFragment}
                api={api}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }

  private renderDeactivatedNotice(api: IApiDescription) {
    const { deactivationInfo } = api;

    if (deactivationInfo) {
      const NoticeComponent = deactivationInfo.deactivationContent;
      return (
        <AlertBox
          headline="Deactivated API"
          status="info"
        >
          <NoticeComponent />
        </AlertBox>
      );
    }
    return null;
  }
}

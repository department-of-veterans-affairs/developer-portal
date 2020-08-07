import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getDeactivatedCategory } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

const ApiReleaseNote = ({ api, flagName }: { api: IApiDescription, flagName: string }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  const renderDeactivatedNotice = () => {
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
  };

  return (
    <Flag name={flagName}>
      <div id={dashUrlFragment}>
        <h2>{api.name}</h2>
        {renderDeactivatedNotice()}
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
    const { apiCategoryKey } = this.props.match.params;

    const isDeactivatedPage = apiCategoryKey === 'deactivated';

    const apiDefs = isDeactivatedPage ? getDeactivatedCategory() : getApiDefinitions();
    const { apis, name: categoryName } = apiDefs[apiCategoryKey];

    const flagName = isDeactivatedPage ? `deactivated_apis` : `hosted_apis`;

    let cardSection;
    if (apis.length > 1) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
        const dashUrlFragment = urlFragment.replace('_', '-');

        return (
          <Flag key={name} name={`${flagName}.${urlFragment}`}>
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
          halo={categoryName}
          header="Release Notes"
          id={`${apiCategoryKey}-release-notes`}
        />
        {cardSection}
        <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
          {apis.map((api: IApiDescription) => (
            <React.Fragment>
              <ApiReleaseNote
                flagName={`${flagName}.${api.urlFragment}`}
                key={api.urlFragment}
                api={api}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }
}

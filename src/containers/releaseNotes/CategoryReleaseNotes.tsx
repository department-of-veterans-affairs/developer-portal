import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import classNames from 'classnames';
import { Flag } from 'flag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { BaseAPICategory, IApiDescription } from '../../apiDefs/schema';
import { getFlags } from '../../App';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

interface ReleaseNotesCardLinksProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
  flagName: string;
}

const ReleaseNotesCardLinks = (props: ReleaseNotesCardLinksProps) => {
  const { apiCategory, categoryKey, flagName } = props;
  const flags: { [apiId: string]: boolean } = getFlags()[flagName];
  const apis: IApiDescription[] = apiCategory.apis.filter(api => flags[api.urlFragment]);
  if (apis.length < 2) {
    return null;
  }

  return (
    <div role="navigation" aria-labelledby={`${categoryKey}-release-notes`}>
      <div className={defaultFlexContainer()}>
        {apis.map((apiDesc: IApiDescription) => {
          const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
          const dashUrlFragment = urlFragment.replace('_', '-');

          return (
            <CardLink
              key={name}
              name={name}
              subhead={
                vaInternalOnly || trustedPartnerOnly ? (
                  <OnlyTags {...{ vaInternalOnly, trustedPartnerOnly }} />
                ) : (
                  undefined
                )
              }
              url={`/release-notes/${categoryKey}#${dashUrlFragment}`}
            >
              {description}
            </CardLink>
          );
        })}
      </div>
    </div>
  );
};

const APIReleaseNote = ({ api, flagName }: { api: IApiDescription; flagName: string }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  return (
    <Flag name={`${flagName}.${api.urlFragment}`}>
      <h2 id={dashUrlFragment} tabIndex={-1}>
        {api.name}
      </h2>
      {api.deactivationInfo && isApiDeactivated(api) && (
        <AlertBox headline="Deactivated API" status="info">
          {api.deactivationInfo.deactivationContent({})}
        </AlertBox>
      )}
      {api.releaseNotes({})}
      <hr />
    </Flag>
  );
};

interface ReleaseNotesCollectionProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
  apiFlagName: string;
  alertText?: string;
}

const ReleaseNotesCollection = (props: ReleaseNotesCollectionProps) => {
  return (
    <section role="region" aria-labelledby={`${props.categoryKey}-release-notes`}>
      <PageHeader
        halo={props.apiCategory.name}
        header="Release Notes"
        containerId={`${props.categoryKey}-release-notes`}
      />
      {props.alertText && (
        <AlertBox status="info" className="vads-u-padding-y--2">
          {props.alertText}
        </AlertBox>
      )}
      <ReleaseNotesCardLinks
        apiCategory={props.apiCategory}
        categoryKey={props.categoryKey}
        flagName={props.apiFlagName}
      />
      <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
        {props.apiCategory.apis.map((api: IApiDescription) => (
          <APIReleaseNote flagName={props.apiFlagName} key={api.urlFragment} api={api} />
        ))}
      </div>
    </section>
  );
};

export const CategoryReleaseNotes = (props: RouteComponentProps<IApiNameParam>) => {
  const { apiCategoryKey } = props.match.params;
  const categoryDefinition = getApiDefinitions()[apiCategoryKey];
  return (
    <ReleaseNotesCollection
      categoryKey={apiCategoryKey}
      apiCategory={categoryDefinition}
      apiFlagName="hosted_apis"
    />
  );
};

export const DeactivatedReleaseNotes = () => {
  return (
    <ReleaseNotesCollection
      categoryKey="deactivated"
      apiCategory={getDeactivatedCategory()}
      apiFlagName="enabled"
      alertText="This is a repository for deactivated APIs and related documentation and release notes."
    />
  );
};

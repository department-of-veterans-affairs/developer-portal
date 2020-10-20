import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import classNames from 'classnames';
import * as React from 'react';
import { Redirect, useParams } from 'react-router';

import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription, BaseAPICategory } from '../../apiDefs/schema';
import { CardLink, OnlyTags } from '../../components';
import PageHeader from '../../components/PageHeader';
import { Flag, getFlags } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';

interface ReleaseNotesCardLinksProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
  flagName: 'enabled' | 'hosted_apis';
}

const ReleaseNotesCardLinks = (props: ReleaseNotesCardLinksProps) => {
  const { apiCategory, categoryKey, flagName } = props;
  const flags: { [apiId: string]: boolean } = getFlags()[flagName];
  const apis: APIDescription[] = apiCategory.apis.filter(api => flags[api.urlFragment]);
  if (apis.length < 2) {
    return null;
  }

  return (
    <div role="navigation" aria-labelledby={`${categoryKey}-release-notes`}>
      <div className={defaultFlexContainer()}>
        {apis.map((apiDesc: APIDescription) => {
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

const APIReleaseNote = ({
  api,
  flagName,
}: {
  api: APIDescription;
  flagName: 'enabled' | 'hosted_apis';
}): JSX.Element => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  return (
    <Flag name={[flagName, api.urlFragment]}>
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
  apiFlagName: 'enabled' | 'hosted_apis';
  alertText?: string;
}

const ReleaseNotesCollection = (props: ReleaseNotesCollectionProps) => (
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
      {props.apiCategory.apis.map((api: APIDescription) => (
        <APIReleaseNote flagName={props.apiFlagName} key={api.urlFragment} api={api} />
      ))}
    </div>
  </section>
);

export const CategoryReleaseNotes = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const categoryDefinition = getApiDefinitions()[apiCategoryKey];
  if (categoryDefinition != null) {
    return (
      <ReleaseNotesCollection
        categoryKey={apiCategoryKey}
        apiCategory={categoryDefinition}
        apiFlagName="hosted_apis"
      />
    );
  } else {
    return <Redirect to="/release-notes" />;
  }
};

export const DeactivatedReleaseNotes = (): JSX.Element => (
  <ReleaseNotesCollection
    categoryKey="deactivated"
    apiCategory={getDeactivatedCategory()}
    apiFlagName="enabled"
    alertText="This is a repository for deactivated APIs and related documentation and release notes."
  />
);

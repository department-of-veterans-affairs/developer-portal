import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import classNames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import {
  PAGE_HEADER_AND_HALO_ID,
  FLAG_API_ENABLED_PROPERTY,
  FLAG_HOSTED_APIS,
} from '../../types/constants';

import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription, BaseAPICategory } from '../../apiDefs/schema';
import { CardLink, ApiTags, PageHeader } from '../../components';
import { Flag, getFlags } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { defaultLoadingProps } from '../../utils/loadingHelper';

interface ReleaseNotesCardLinksProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
  flagName: 'enabled' | 'hosted_apis';
}

const ReleaseNotesCardLinks: React.FunctionComponent<ReleaseNotesCardLinksProps> = (
  props: ReleaseNotesCardLinksProps,
) => {
  const { apiCategory, categoryKey, flagName } = props;
  const flags: { [apiId: string]: boolean } = getFlags()[flagName];
  const apis: APIDescription[] = apiCategory.apis.filter(api => flags[api.urlFragment]);
  if (apis.length < 2) {
    return null;
  }

  return (
    <div role="navigation" aria-labelledby={PAGE_HEADER_AND_HALO_ID}>
      <div className={defaultFlexContainer()}>
        {apis.map((apiDesc: APIDescription) => {
          const { description, name, urlFragment, vaInternalOnly, openData } = apiDesc;
          const dashUrlFragment = urlFragment.replace('_', '-');

          return (
            <CardLink
              key={name}
              name={name}
              subhead={vaInternalOnly && <ApiTags {...{ openData, vaInternalOnly }} />}
              url={`/release-notes/${categoryKey}#${dashUrlFragment}`}
              callToAction={`View the release notes for the ${name}`}
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
          <ReactMarkdown>{api.deactivationInfo.deactivationContent}</ReactMarkdown>
        </AlertBox>
      )}
      <div>
        <ReactMarkdown>{api.releaseNotes}</ReactMarkdown>
      </div>
      <hr />
    </Flag>
  );
};

interface ReleaseNotesCollectionProps {
  categoryKey: string;
  apiCategory?: BaseAPICategory;
  apiFlagName: 'enabled' | 'hosted_apis';
  alertText?: string;
}

const ReleaseNotesCollection: React.FunctionComponent<ReleaseNotesCollectionProps> = (
  props: ReleaseNotesCollectionProps,
) => (
  <>
    <Helmet>
      <title>{`${props.apiCategory?.name ?? ''} Release Notes`}</title>
    </Helmet>
    <PageHeader halo={props.apiCategory?.name} header="Release Notes" />
    {props.alertText && (
      <AlertBox status="info" className="vads-u-padding-y--2">
        {props.alertText}
      </AlertBox>
    )}
    {props.apiCategory ? (
      <>
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
      </>
    ) : (
      <LoadingIndicator {...defaultLoadingProps()} />
    )}
  </>
);

export const CategoryReleaseNotes = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const categories = getApiDefinitions();

  return (
    <ReleaseNotesCollection
      categoryKey={apiCategoryKey}
      apiCategory={categories[apiCategoryKey]}
      apiFlagName={FLAG_HOSTED_APIS}
    />
  );
};

export const DeactivatedReleaseNotes = (): JSX.Element => (
  <ReleaseNotesCollection
    categoryKey="deactivated"
    apiCategory={getDeactivatedCategory()}
    apiFlagName={FLAG_API_ENABLED_PROPERTY}
    alertText="This is a repository for deactivated APIs and related documentation and release notes."
  />
);

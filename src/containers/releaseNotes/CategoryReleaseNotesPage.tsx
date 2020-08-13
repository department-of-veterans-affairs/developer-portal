import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getDeactivatedCategory } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { BaseAPICategory } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';
import { IApiNameParam } from '../../types';

// import useApiCategoryKey from '../../hooks/useApiCategoryKey';

import CategoryReleaseNotesCardSection from './CategoryReleaseNotesCardSection';
import CategoryReleaseNotesList from './CategoryReleaseNotesList';

const CategoryReleaseNotesPageContent = ({ apiCategory, apiFlagName } : { apiCategory: BaseAPICategory, apiFlagName: string }) => {

  if (apiCategory && apiFlagName !== '') {
    return (
      <section role="region" aria-labelledby={`${apiCategory.name}-release-notes`}>
        <PageHeader
          halo={apiCategory.name}
          header="Release Notes"
          id={`${apiCategory.name}-release-notes`}
        />
        <CategoryReleaseNotesCardSection
          apiCategory={apiCategory}
          apiFlagName={apiFlagName}
        />
        <CategoryReleaseNotesList
          apiCategory={apiCategory}
          apiFlagName={apiFlagName}
        />
      </section>
    );
  }
  return null;
};

export const ActiveCategoryReleaseNotesPage = ({ matchParam }: { matchParam: string }) => {
  const categoryDefinition = getApiDefinitions()[matchParam];
  return (
    <CategoryReleaseNotesPageContent
      apiCategory={categoryDefinition}
      apiFlagName='hosted_apis'
    />
  );
};

export const DeactivatedReleaseNotesPage = ({ matchParam }: { matchParam: string }) => {
  const categoryDefinition = getDeactivatedCategory()[matchParam];
  return (
    <CategoryReleaseNotesPageContent
      apiCategory={categoryDefinition}
      apiFlagName='deactivated_apis'
    />
  );
};

const CategoryReleaseNotesPage = (props: RouteComponentProps<IApiNameParam>) => {
  const { apiCategoryKey } = props.match.params;

  if (apiCategoryKey === 'deactivated') {
    return (
      <DeactivatedReleaseNotesPage matchParam='deactivated' />
    );
  }

  return (
    <ActiveCategoryReleaseNotesPage matchParam={apiCategoryKey} />
  );
};


export default CategoryReleaseNotesPage;

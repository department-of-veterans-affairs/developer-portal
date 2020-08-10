import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { IApiNameParam } from '../../types';

import PageHeader from '../../components/PageHeader';
import useApiCategoryKey from '../../hooks/useApiCategoryKey';

import CategoryReleaseNotesCardSection from './CategoryReleaseNotesCardSection';
import CategoryReleaseNotesList from './CategoryReleaseNotesList';

const CategoryReleaseNotesPage = (props: RouteComponentProps<IApiNameParam>) => {
  // when react-router is updated to v5+, we should move line 12 to within the
  // custom hook using "useLocation"
  const { apiCategoryKey } = props.match.params;
  const {
    apiDefinition,
    apiFlagName,
  } = useApiCategoryKey(apiCategoryKey);

  if (apiDefinition && apiFlagName !== '') {
    return (
      <section role="region" aria-labelledby={`${apiCategoryKey}-release-notes`}>
        <PageHeader
          halo={apiCategoryKey}
          header="Release Notes"
          id={`${apiCategoryKey}-release-notes`}
        />
        <CategoryReleaseNotesCardSection
          apiDefinition={apiDefinition}
          apiFlagName={apiFlagName}
        />
        <CategoryReleaseNotesList
          apiDefinition={apiDefinition}
          apiFlagName={apiFlagName}
        />
      </section>
    );
  }
  return null;
};

export default CategoryReleaseNotesPage;

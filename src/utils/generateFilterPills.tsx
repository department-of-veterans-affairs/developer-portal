import React from 'react';
import { lookupApiCategoryBySlug } from '../apiDefs/query';
import { getAuthTypeName, Pill } from '../components';

interface GenerateFilterPillsProps {
  clearAuthFilter: (urlSlug: string) => void;
  clearSearchFilter: () => void;
  clearTopicFilter: (urlFragment: string) => void;
  topicFilter: string[];
  authFilter: string[];
  search: string;
}

export const generateFilterPills = (pillsData: GenerateFilterPillsProps): JSX.Element[] => {
  const { clearAuthFilter, clearSearchFilter, clearTopicFilter, topicFilter, authFilter, search } =
    pillsData;

  const topicPills = topicFilter.map(
    (urlFragment: string): JSX.Element => (
      <Pill
        name={lookupApiCategoryBySlug(urlFragment)?.name ?? ''}
        onClick={(): void => clearTopicFilter(urlFragment)}
        type="topic"
        key={`topic-${urlFragment}`}
      />
    ),
  );

  const authPills = authFilter.map(
    (urlSlug: string): JSX.Element => (
      <Pill
        name={getAuthTypeName(urlSlug)}
        onClick={(): void => clearAuthFilter(urlSlug)}
        type="auth"
        key={`auth-${urlSlug}`}
      />
    ),
  );

  const searchPill = (
    <Pill name={`'${search}'`} onClick={clearSearchFilter} type="search" key={`search-${search}`} />
  );

  if (search.length > 0) {
    return [...topicPills, ...authPills, searchPill];
  }

  return [...topicPills, ...authPills];
};

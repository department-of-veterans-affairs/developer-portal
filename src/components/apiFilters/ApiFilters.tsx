import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getAllApis, getApisLoaded, isAcgApi, isCcgApi } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { AuthFilters, Pill, SearchFilters, TopicFilters, getAuthTypeName } from '../../components';

interface ExploreRootParams {
  categoryUrlSlugs?: string;
}
export interface TopicFilterValues {
  topics: string[];
}
export interface AuthFilterValues {
  authTypes: string[];
}
export interface SearchFilterValues {
  search: string;
}
interface FilterDataObject {
  [key: string]: string;
}

interface ApiFiltersProps {
  apis: APIDescription[];
  setApis: React.Dispatch<React.SetStateAction<APIDescription[]>>;
}

export const ApiFilters = ({ apis, setApis }: ApiFiltersProps): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<ExploreRootParams>();
  const [topicFilter, setTopicFilter] = useState<string[]>(
    params.categoryUrlSlugs?.split('+') ?? [],
  );
  const [authFilter, setAuthFilter] = useState<string[]>(
    new URLSearchParams(location.search).get('auth')?.split('+') ?? [],
  );
  const [search, setSearch] = useState<string>(new URLSearchParams(location.search).get('q') ?? '');
  const apisLoaded = getApisLoaded();

  const handleTopicFilterSubmit = (values: TopicFilterValues): void => {
    setTopicFilter(values.topics);
    if (values.topics.length > 0) {
      history.replace({
        ...location,
        pathname: `/explore/${values.topics.join('+')}`,
      });
    } else {
      history.replace({
        ...location,
        pathname: '/explore',
      });
    }
  };

  const applyQueryStringFilters = (data: FilterDataObject): void => {
    const queryString = Object.keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&');
    history.replace({
      ...location,
      search: queryString,
    });
  };

  const handleAuthTypeFilterSubmit = (values: AuthFilterValues): void => {
    const data: FilterDataObject = {};
    if (values.authTypes.length > 0) {
      data.auth = values.authTypes.join('+');
    }
    if (search) {
      data.q = search;
    }
    setAuthFilter(values.authTypes);
    applyQueryStringFilters(data);
  };

  const handleSearchSubmit = (values: SearchFilterValues): void => {
    const data: FilterDataObject = {};
    if (authFilter.length > 0) {
      data.auth = authFilter.join('+');
    }
    if (values.search) {
      data.q = values.search;
    }
    setSearch(values.search);
    applyQueryStringFilters(data);
  };

  const clearTopicFilter = (): void => {
    handleTopicFilterSubmit({ topics: [] });
  };

  const clearAuthFilter = (): void => {
    handleAuthTypeFilterSubmit({ authTypes: [] });
  };

  const clearSearchFilter = (): void => {
    handleSearchSubmit({ search: '' });
  };

  const clearAllFilters = (): void => {
    clearTopicFilter();
    clearAuthFilter();
    clearSearchFilter();
  };

  useEffect(() => {
    let allApis = getAllApis();
    if (topicFilter.length > 0) {
      allApis = allApis.filter((api: APIDescription) => topicFilter.includes(api.categoryUrlSlug));
    }
    if (authFilter.length > 0) {
      allApis = allApis.filter((api: APIDescription) => {
        if (authFilter.includes('acg') && isAcgApi(api)) {
          return true;
        }
        if (authFilter.includes('ccg') && isCcgApi(api)) {
          return true;
        }
        return false;
      });
    }
    if (search) {
      const fuse = new Fuse(allApis, {
        keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
      });
      allApis = fuse
        .search<APIDescription>(search)
        .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item);
    }
    setApis(allApis);
  }, [apisLoaded, authFilter, search, setApis, topicFilter]);

  const hasFilterPill = topicFilter.length || authFilter.length || search;

  return (
    <>
      <div className="filters-container" data-cy="explore-filters">
        <div className="filter-controls">
          <TopicFilters
            handleTopicFilterSubmit={handleTopicFilterSubmit}
            key={`topic-${topicFilter.join('')}`}
            topicFilter={topicFilter}
          />
          <AuthFilters
            authFilter={authFilter}
            handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit}
            key={`authType-${topicFilter.join('')}`}
          />
          <SearchFilters
            handleSearchSubmit={handleSearchSubmit}
            search={search}
            key={`search-${search}`}
          />
        </div>
        <div className="caption-container">
          <p className="vads-u-margin-y--0 vads-u-font-family--serif">
            Showing all{' '}
            <span data-testid="api-count" className="vads-u-font-weight--bold">
              {apis.length}
            </span>{' '}
            items
          </p>
        </div>
      </div>
      {hasFilterPill && (
        <div className="filter-pills-container">
          {topicFilter.map(
            (name: string): JSX.Element => (
              <Pill name={name} onClick={clearTopicFilter} type="topic" key={`topic-${name}`} />
            ),
          )}
          {authFilter.map(
            (urlSlug: string): JSX.Element => (
              <Pill
                name={getAuthTypeName(urlSlug)}
                onClick={clearAuthFilter}
                type="auth"
                key={`auth-${urlSlug}`}
              />
            ),
          )}
          {search && (
            <Pill
              name={`'${search}'`}
              onClick={clearSearchFilter}
              type="search"
              key={`search-${search}`}
            />
          )}
          <button onClick={clearAllFilters} type="button">
            Clear all
          </button>
        </div>
      )}
    </>
  );
};

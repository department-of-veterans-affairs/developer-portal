import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { AuthFilters, Pill, SearchFilters, TopicFilters, getAuthTypeName } from '../../components';
import {
  getAllApis,
  getApisLoaded,
  isAcgApi,
  isCcgApi,
  lookupApiCategoryBySlug,
} from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { useOutsideGroupClick } from '../../hooks';

import './ApiFilters.scss';

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
  const filterButtonRef = useRef(null);
  const filterContainerRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const params = useParams<ExploreRootParams>();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);
  const toggleMobileMenu = (): void => setIsMobileMenuVisible(prevState => !prevState);
  const [topicFilter, setTopicFilter] = useState<string[]>(
    params.categoryUrlSlugs?.split('+') ?? [],
  );
  const [authFilter, setAuthFilter] = useState<string[]>(
    new URLSearchParams(location.search).get('auth')?.split('+') ?? [],
  );
  const [search, setSearch] = useState<string>(new URLSearchParams(location.search).get('q') ?? '');
  const apisLoaded = getApisLoaded();

  const filterControlsClasses = classNames(
    {
      'vads-u-display--flex': isMobileMenuVisible,
      'vads-u-display--none': !isMobileMenuVisible,
    },
    'vads-u-flex-direction--column-reverse',
    'medium-screen:vads-u-display--flex',
    'medium-screen:vads-u-flex-direction--row',
    'filter-controls',
  );

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

  useOutsideGroupClick([filterButtonRef, filterContainerRef], () => {
    if (isMobileMenuVisible) {
      toggleMobileMenu();
    }
  });

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
      <div className="caption-container medium-screen:vads-u-display--none">
        <p className="vads-u-margin-y--0 vads-u-font-family--serif">
          Showing all{' '}
          <span data-testid="api-count" className="vads-u-font-weight--bold">
            {apis.length}
          </span>{' '}
          items
        </p>
      </div>
      <button
        className="filters-toggle-button vads-u-margin--0 vads-u-display--flex medium-screen:vads-u-display--none"
        onClick={toggleMobileMenu}
        type="button"
        ref={filterButtonRef}
      >
        <FontAwesomeIcon icon={faFilter} />
        <span className="vads-u-margin-left--1">Filters</span>
        <FontAwesomeIcon
          className="filters-toggle-icon"
          icon={isMobileMenuVisible ? faMinus : faPlus}
        />
      </button>
      <div className="filters-container" data-cy="explore-filters" ref={filterContainerRef}>
        <div className={filterControlsClasses}>
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
        <div className="caption-container vads-u-display--none">
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
          {topicFilter.map((urlFragment: string): JSX.Element => {
            const topic = lookupApiCategoryBySlug(urlFragment);
            return (
              <Pill
                name={topic?.name ?? ''}
                onClick={clearTopicFilter}
                type="topic"
                key={`topic-${urlFragment}`}
              />
            );
          })}
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

/* eslint-disable max-lines */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AuthFilters, FilterPills, SearchFilters, TopicFilters } from '../../components';
import { getActiveApis, getApisLoaded, isAcgApi, isCcgApi } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { useOutsideGroupClick } from '../../hooks';
import { generateFilterPills } from '../../utils/generateFilterPills';
import './ApiFilters.scss';
import ApisLoader from '../apisLoader/ApisLoader';
import { ScreenReaderFilters } from './ScreenReaderFilters';

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
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);
  const toggleMobileMenu = (): void => setIsMobileMenuVisible(prevState => !prevState);
  const [topicFilter, setTopicFilter] = useState<string[]>(
    params.categoryUrlSlugs?.split('+') ?? [],
  );
  const [authFilter, setAuthFilter] = useState<string[]>(
    new URLSearchParams(location.search).get('auth')?.split(' ') ?? [],
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

  const updateApis = (topics: string[], auth: string[], searchTerms: string): void => {
    let activeApis = getActiveApis();
    if (topics.length > 0) {
      activeApis = activeApis.filter((api: APIDescription) => topics.includes(api.categoryUrlSlug));
    }
    if (auth.length > 0) {
      activeApis = activeApis.filter((api: APIDescription) => {
        if (auth.includes('acg') && isAcgApi(api)) {
          return true;
        }
        if (auth.includes('ccg') && isCcgApi(api)) {
          return true;
        }
        return false;
      });
    }
    if (searchTerms) {
      const fuse = new Fuse(activeApis, {
        keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
      });
      activeApis = fuse
        .search<APIDescription>(searchTerms)
        .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item);
    }
    setApis(activeApis);
  };

  const handleTopicFilterSubmit = (values: TopicFilterValues, skipFocus?: boolean): void => {
    updateApis(values.topics, authFilter, search);
    if (values.topics.length > 0) {
      history.replaceState({}, '', `/explore/${values.topics.join('+')}`);
    } else {
      history.replaceState({}, '', '/explore');
    }
    window.scrollTo(0, 0);
    if (isMobileMenuVisible) {
      toggleMobileMenu();
    }
    setTopicFilter(values.topics);
    if (skipFocus) {
      return;
    }
    const desktopTopicButton = document.getElementById(
      'topic-filter-button-desktop',
    ) as HTMLButtonElement;
    const mobileTopicButton = document.getElementById(
      'topic-filter-button-mobile',
    ) as HTMLButtonElement;
    const isDesktopTopicButtonVisible =
      window.getComputedStyle(desktopTopicButton).display !== 'none';
    const isMobileTopicButtonVisible =
      window.getComputedStyle(mobileTopicButton).display !== 'none';
    if (isDesktopTopicButtonVisible) {
      desktopTopicButton.focus();
    } else if (isMobileTopicButtonVisible) {
      mobileTopicButton.focus();
    }
  };

  const applyQueryStringFilters = (data: FilterDataObject, pathOverride?: string): void => {
    const queryString = Object.keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&');
    const pathname = pathOverride ?? location.pathname;
    navigate(
      {
        ...location,
        pathname,
        search: queryString,
      },
      { replace: true },
    );
  };

  const handleAuthTypeFilterSubmit = (values: AuthFilterValues, skipFocus?: boolean): void => {
    const data: FilterDataObject = {};
    if (values.authTypes.length > 0) {
      data.auth = values.authTypes.join('+');
    }
    if (search) {
      data.q = search;
    }
    updateApis(topicFilter, values.authTypes, search);
    setAuthFilter(values.authTypes);
    applyQueryStringFilters(data);
    window.scrollTo(0, 0);
    if (isMobileMenuVisible) {
      toggleMobileMenu();
    }
    if (skipFocus) {
      return;
    }
    const desktopAuthButton = document.getElementById(
      'auth-filter-button-desktop',
    ) as HTMLButtonElement;
    const mobileAuthButton = document.getElementById(
      'auth-filter-button-mobile',
    ) as HTMLButtonElement;
    const isDesktopAuthButtonVisible =
      window.getComputedStyle(desktopAuthButton).display !== 'none';
    const isMobileAuthButtonVisible = window.getComputedStyle(mobileAuthButton).display !== 'none';
    if (isDesktopAuthButtonVisible) {
      desktopAuthButton.focus();
    } else if (isMobileAuthButtonVisible) {
      mobileAuthButton.focus();
    }
  };

  const handleSearchSubmit = (values: SearchFilterValues, skipFocus?: boolean): void => {
    const data: FilterDataObject = {};
    if (authFilter.length > 0) {
      data.auth = authFilter.join('+');
    }
    if (values.search) {
      data.q = values.search;
    }
    updateApis(topicFilter, authFilter, values.search);
    setSearch(values.search);
    applyQueryStringFilters(data);
    window.scrollTo(0, 0);
    if (isMobileMenuVisible) {
      toggleMobileMenu();
    }
    if (skipFocus) {
      return;
    }
    const searchInput = document.getElementById('fuzzy-search') as HTMLInputElement;
    searchInput.focus();
  };

  const clearTopicFilter = (urlFragment: string): void => {
    const newTopics = topicFilter.filter(e => e !== urlFragment);
    handleTopicFilterSubmit({ topics: newTopics }, true);
  };

  const clearAuthFilter = (urlSlug: string): void => {
    const newAuthTypes = authFilter.filter(e => e !== urlSlug);
    handleAuthTypeFilterSubmit({ authTypes: newAuthTypes }, true);
  };

  const clearSearchFilter = (): void => {
    handleSearchSubmit({ search: '' }, true);
  };

  const clearAllFilters = (): void => {
    setTopicFilter([]);
    setAuthFilter([]);
    setSearch('');
    updateApis([], [], '');
    applyQueryStringFilters({}, '/explore');
    const header = document.querySelector('#page-header');
    (header as HTMLElement | null)?.focus();
  };

  useOutsideGroupClick([filterButtonRef, filterContainerRef], () => {
    if (isMobileMenuVisible) {
      toggleMobileMenu();
    }
  });

  useEffect(() => {
    if (!apisLoaded) {
      return;
    }

    let activeApis = getActiveApis();
    if (topicFilter.length > 0) {
      activeApis = activeApis.filter((api: APIDescription) =>
        topicFilter.includes(api.categoryUrlSlug),
      );
    }
    if (authFilter.length > 0) {
      activeApis = activeApis.filter((api: APIDescription) => {
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
      const fuse = new Fuse(activeApis, {
        keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
      });
      activeApis = fuse
        .search<APIDescription>(search)
        .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item);
    }
    setApis(activeApis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apisLoaded, setApis]);

  useEffect(() => {
    localStorage.setItem('exploreApisPath', location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const checkStickiness = (): void => {
      const apiFiltersElm = document.getElementById('api-filters') as HTMLElement;
      const footer = document.querySelector('footer') as HTMLElement;
      const filtersToggleButton = document.querySelector(
        '.filters-toggle-button',
      ) as HTMLButtonElement;

      const footerPosition = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (windowHeight > footerPosition) {
        apiFiltersElm.style.position = 'absolute';
        filtersToggleButton.style.borderBottom = '1px solid #ffffff';
      } else {
        apiFiltersElm.style.position = 'fixed';
        filtersToggleButton.style.borderBottom = 'unset';
      }
    };
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', checkStickiness);
    }

    return () => {
      if (window.innerWidth < 768) {
        window.removeEventListener('scroll', checkStickiness);
      }
    };
  }, []);

  const hasFilterPill = Boolean(topicFilter.length || authFilter.length || search);
  const pillsProps = {
    authFilter,
    clearAuthFilter,
    clearSearchFilter,
    clearTopicFilter,
    search,
    topicFilter,
  };
  const pills = generateFilterPills(pillsProps);

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
      <div id="api-filters">
        <button
          className="filters-toggle-button vads-u-margin--0 vads-u-display--flex medium-screen:vads-u-display--none"
          onClick={toggleMobileMenu}
          type="button"
          ref={filterButtonRef}
        >
          <FontAwesomeIcon icon={faFilter as IconProp} />
          <span className="vads-u-margin-left--1">Filters</span>
          <FontAwesomeIcon
            className="filters-toggle-icon"
            icon={(isMobileMenuVisible ? faMinus : faPlus) as IconProp}
          />
        </button>
        <div className="filters-container" data-cy="explore-filters" ref={filterContainerRef}>
          <div className={filterControlsClasses}>
            <TopicFilters
              handleTopicFilterSubmit={handleTopicFilterSubmit}
              topicFilter={topicFilter}
            />
            <AuthFilters
              authFilter={authFilter}
              handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit}
            />
            <SearchFilters handleSearchSubmit={handleSearchSubmit} search={search} />
          </div>
          <div className="caption-container vads-u-display--none medium-screen:vads-u-display--flex">
            <p className="vads-u-margin-y--0 vads-u-font-family--serif">
              Showing all <span className="vads-u-font-weight--bold">{apis.length}</span> items
            </p>
          </div>
        </div>
      </div>
      <span aria-live="polite" className="sr-only">
        {topicFilter.length || authFilter.length
          ? `${topicFilter.length + authFilter.length} filters applied and API list updated`
          : ''}
      </span>
      <ScreenReaderFilters
        numOfApis={apis.length}
        topics={topicFilter}
        auth={authFilter}
        search={search}
      />
      {hasFilterPill && (
        <ApisLoader hideSpinner>
          <FilterPills clearAllFilters={clearAllFilters}>{pills}</FilterPills>
        </ApisLoader>
      )}
    </>
  );
};

import classNames from 'classnames';
import { faCaretDown, faCaretUp, faKey, faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Fuse from 'fuse.js';
import { useHistory, useLocation, useParams } from 'react-router';
import { CheckboxRadioField, ExploreApiCard, PageHeader } from '../../components';
import './ExploreRoot.scss';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import {
  getAllApis,
  getApiCategoryOrder,
  isAcgApi,
  isCcgApi,
  lookupApiCategory,
} from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { useOutsideGroupClick } from '../../hooks';

interface AuthFilterType {
  name: string;
  urlSlug: string;
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

const authTypes = [
  { name: 'Authorization Code Grant', urlSlug: 'acg' },
  { name: 'Client Credentials Grant', urlSlug: 'ccg' },
] as AuthFilterType[];

interface ExploreRootParams {
  categoryUrlSlugs?: string;
}

export const ExploreRoot = (): JSX.Element => {
  const params = useParams<ExploreRootParams>();
  const topicButtonRef = useRef(null);
  const topicContainerRef = useRef(null);
  const authButtonRef = useRef(null);
  const authContainerRef = useRef(null);
  const [isTopicOpen, setIsTopicOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const [topicFilter, setTopicFilter] = useState<string[]>(
    params.categoryUrlSlugs?.split('+') ?? [],
  );
  const [authFilter, setAuthFilter] = useState<string[]>(
    new URLSearchParams(location.search).get('authTypes')?.split('+') ?? [],
  );
  const [search, setSearch] = useState<string>(new URLSearchParams(location.search).get('q') ?? '');
  const topics = getApiCategoryOrder();

  const initialTopics: TopicFilterValues = {
    topics: topicFilter,
  };
  const initialAuthTypes: AuthFilterValues = {
    authTypes: authFilter,
  };
  const initialSearch: SearchFilterValues = {
    search,
  };
  const toggleTopicOpen = (): void => setIsTopicOpen(prevState => !prevState);
  const toggleAuthOpen = (): void => setIsAuthOpen(prevState => !prevState);

  const topicClassNames = classNames('filter-topic-container', {
    'vads-u-display--block': isTopicOpen,
    'vads-u-display--none': !isTopicOpen,
  });
  const authClassNames = classNames('filter-topic-container', {
    'vads-u-display--block': isAuthOpen,
    'vads-u-display--none': !isAuthOpen,
  });

  useOutsideGroupClick([topicButtonRef, topicContainerRef], () => {
    if (isTopicOpen) {
      toggleTopicOpen();
    }
  });

  useOutsideGroupClick([authButtonRef, authContainerRef], () => {
    if (isAuthOpen) {
      toggleAuthOpen();
    }
  });

  let apis = getAllApis();
  if (topicFilter.length > 0) {
    apis = apis.filter((api: APIDescription) => topicFilter.includes(api.categoryUrlSlug));
  }
  if (authFilter.length > 0) {
    apis = apis.filter((api: APIDescription) => {
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
    const fuse = new Fuse(apis, {
      keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
    });
    apis = fuse
      .search<APIDescription>(search)
      .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item);
  }

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
  const handleAuthTypeFilterSubmit = (values: AuthFilterValues): void => {
    if (values.authTypes.length > 0) {
      history.replace({
        ...location,
        search: `authTypes=${values.authTypes.join('+')}`,
      });
    } else {
      history.replace({
        ...location,
        search: '',
      });
    }
    setAuthFilter(values.authTypes);
  };
  const handleSearchSubmit = (values: SearchFilterValues): void => {
    setSearch(values.search);
    if (values.search) {
      history.replace({
        ...location,
        search: `q=${values.search}`,
      });
    } else {
      history.replace({
        ...location,
        search: '',
      });
    }
  };

  return (
    <div className="explore-root-container">
      <PageHeader header="Explore our APIs" />
      <p className="vads-u-margin-y--0">
        View and sort our APIs to find the best one for your needs.
      </p>
      <div className="filters-container" data-cy="explore-filters">
        <div className="filter-controls">
          <Formik initialValues={initialTopics} onSubmit={handleTopicFilterSubmit}>
            <FieldArray
              name="topics"
              render={(): JSX.Element => (
                <Form className="explore-filter-form vads-u-margin-right--2" noValidate>
                  <button
                    className="explore-filter-button"
                    type="button"
                    onClick={toggleTopicOpen}
                    ref={topicButtonRef}
                  >
                    <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag} />
                    Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
                    {isTopicOpen ? (
                      <FontAwesomeIcon className="filter-button-caret" icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon className="filter-button-caret" icon={faCaretDown} />
                    )}
                  </button>
                  <div className={topicClassNames} ref={topicContainerRef}>
                    {topics.map((topic: string) => {
                      const category = lookupApiCategory(topic);
                      return (
                        <CheckboxRadioField
                          key={category.urlSlug}
                          label={`${category.name} (${category.apis.length})`}
                          name="topics"
                          type="checkbox"
                          value={category.urlSlug}
                        />
                      );
                    })}
                    <button type="submit">APPLY FILTERS</button>
                  </div>
                </Form>
              )}
            />
          </Formik>

          <Formik initialValues={initialAuthTypes} onSubmit={handleAuthTypeFilterSubmit}>
            <FieldArray
              name="authTypes"
              render={(): JSX.Element => (
                <Form className="explore-filter-form" noValidate>
                  <button
                    className="explore-filter-button"
                    type="button"
                    onClick={toggleAuthOpen}
                    ref={authButtonRef}
                  >
                    <FontAwesomeIcon
                      className="fa-rotate-270 vads-u-margin-right--1"
                      icon={faKey}
                    />
                    Auth Type{authFilter.length > 0 && ` (${authFilter.length})`}
                    {isAuthOpen ? (
                      <FontAwesomeIcon className="filter-button-caret" icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon className="filter-button-caret" icon={faCaretDown} />
                    )}
                  </button>
                  <div className={authClassNames} ref={authContainerRef}>
                    {authTypes.map(authType => (
                      <CheckboxRadioField
                        key={authType.urlSlug}
                        label={authType.name}
                        name="authTypes"
                        type="checkbox"
                        value={authType.urlSlug}
                      />
                    ))}
                    <button type="submit">APPLY FILTERS</button>
                  </div>
                </Form>
              )}
            />
          </Formik>

          <Formik
            initialValues={initialSearch}
            onSubmit={handleSearchSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form noValidate id="explore-page-fuzzy-search">
              <Field
                id="fuzzy-search"
                className="va-api-text-field"
                name="search"
                required={false}
                aria-invalid={false}
                type="text"
                placeholder="Search APIs by keyword"
              />
              <button type="submit" className="display-inline">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </Form>
          </Formik>
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
      <ApisLoader>
        <>
          <div data-cy="api-list" className="explore-main-container" role="list">
            {apis.map((api: APIDescription) => (
              <ExploreApiCard key={api.urlSlug} api={api} />
            ))}
          </div>
          <p className={classNames('explore-end-of-list', 'vads-u-color--gray-warm-dark')}>
            End of list
          </p>
        </>
      </ApisLoader>
    </div>
  );
};

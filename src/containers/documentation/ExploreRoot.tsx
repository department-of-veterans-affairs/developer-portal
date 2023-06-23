/* eslint-disable no-console */
import classNames from 'classnames';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { useHistory, useLocation, useParams } from 'react-router';
import { CheckboxRadioField, ExploreApiCard, PageHeader } from '../../components';
import './ExploreRoot.scss';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import {
  getAllApis,
  getApiCategoryOrder,
  isAcgApi,
  isApiKeyApi,
  isCcgApi,
  lookupApiCategory,
} from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

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
  { name: 'API Key', urlSlug: 'apikey' },
] as AuthFilterType[];

interface ExploreRootParams {
  categoryUrlSlugs?: string;
}

export const ExploreRoot = (): JSX.Element => {
  const params = useParams<ExploreRootParams>();
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

  let apis = getAllApis();
  console.log(apis);
  if (topicFilter.length > 0) {
    console.log(topicFilter);
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
      if (authFilter.includes('apikey') && isApiKeyApi(api)) {
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
                <Form noValidate>
                  <div className="filter-topic-container">
                    {topics.map((topic: string) => {
                      const category = lookupApiCategory(topic);
                      return (
                        <CheckboxRadioField
                          key={category.urlSlug}
                          label={category.name}
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
                <Form noValidate>
                  <div className="filter-topic-container">
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

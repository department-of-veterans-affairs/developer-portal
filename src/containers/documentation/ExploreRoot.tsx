import classNames from 'classnames';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { useHistory, useLocation } from 'react-router';
import { CheckboxRadioField, ExploreApiCard, PageHeader } from '../../components';
import './ExploreRoot.scss';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { getAllApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

interface ApiFilter {
  type: 'auth' | 'topic';
  value: string;
}

// update
const topicNames = ['benefits', 'etc'];

export interface FuzzyValues {
  search: string;
}

export const ExploreRoot = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState<string>(
    new URLSearchParams(location.search).get('search') ?? '',
  );
  const [filters, setFilters] = useState<ApiFilter[]>([]); // TODO: grab filters from URL
  const [filteredApis, setFilteredApis] = useState<APIDescription[]>([]);
  const apis = getAllApis();

  if (search) {
    const fuse = new Fuse(apis, {
      keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
    });
    // TODO: combine with other filters
    setFilteredApis(
      fuse
        .search<APIDescription>(search)
        .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item),
    );
  }

  const initialFuzzy: FuzzyValues = {
    search: new URLSearchParams(location.search).get('search') ?? '',
  };

  const initialFilters = {};

  const handleFuzzySubmit = (values: FuzzyValues): void => {
    setSearch(values.search);
    if (values.search) {
      history.replace({
        ...location,
        search: `search=${values.search}`,
      });
    } else {
      history.replace({
        ...location,
        search: '',
      });
    }
  };

  interface FilterValues {}

  const handleFiltersSubmit = (values: FilterValues): void => {
    // transform values into an array of filters of shape: { type: string, value: string }
    // { type: 'auth', value: 'acg' }
    // { type: 'topic', value: 'benefits'}
    setFilters([]);
  };

  useEffect(() => {
    // TODO: combine with search
    setFilteredApis(
      apis.filter(api =>
        filters.every(filter => {
          if (
            (filter.type === 'topic' && filter.value === api.categoryUrlFragment) ||
            (filter.type === 'auth' && filter.value === api.oAuthInfo?.acgInfo?.sandboxAud) ||
            (filter.type === 'auth' && filter.value === api.oAuthInfo?.ccgInfo?.sandboxAud)
          ) {
            return true;
          }
          return false;
        }),
      ),
    );
    // add search
  }, [apis, filters]);

  return (
    <div className="explore-root-container">
      <PageHeader header="Explore our APIs" />
      <p className="vads-u-margin-y--0">
        View and sort our APIs to find the best one for your needs.
      </p>
      <div className="filters-container" data-cy="explore-filters">
        <div className="filter-controls">
          <Formik initialValues={initialFilters} onSubmit={handleFiltersSubmit}>
            <div className="filter-topic-container">
              {topicNames.map(topic => (
                <CheckboxRadioField
                  key={topic}
                  label={topic}
                  name={`topic.${topic}`}
                  type="checkbox"
                  value={topic}
                />
              ))}
            </div>
          </Formik>

          <Formik initialValues={initialFilters} onSubmit={handleFiltersSubmit}>
            <div className="filter-auth-container">
              <CheckboxRadioField label="ACG" name="auth.acg" type="checkbox" value="yes" />
              <CheckboxRadioField label="CCG" name="auth.ccg" type="checkbox" value="yes" />
            </div>
          </Formik>

          <Formik
            initialValues={initialFuzzy}
            onSubmit={handleFuzzySubmit}
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
              {filteredApis.length}
            </span>{' '}
            items
          </p>
        </div>
      </div>
      <ApisLoader>
        <>
          <div data-cy="api-list" className="explore-main-container" role="list">
            {filteredApis.map((api: APIDescription) => (
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

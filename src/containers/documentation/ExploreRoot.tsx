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
  name: string;
  type: 'auth' | 'category';
  urlSlug: string;
}

const allFilters = [
  { name: 'Appeals', type: 'category', urlSlug: 'appeals' },
  { name: 'Benefits', type: 'category', urlSlug: 'va-benefits' },
  { name: 'Facilities', type: 'category', urlSlug: 'facilities' },
  { name: 'Forms', type: 'category', urlSlug: 'forms' },
  { name: 'Health', type: 'category', urlSlug: 'health' },
  { name: 'Loan Guaranty', type: 'category', urlSlug: 'loan-guaranty' },
  { name: 'Veteran Verification', type: 'category', urlSlug: 'verification' },
  { name: 'Authorization Code Grant', type: 'auth', urlSlug: 'acg' },
  { name: 'Client Credentials Grant', type: 'auth', urlSlug: 'ccg' },
];

export interface FuzzyValues {
  search: string;
}

export const ExploreRoot = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState<string>(
    new URLSearchParams(location.search).get('search') ?? '',
  );

  const findFilter = (filter: string): ApiFilter => allFilters.filter(f => f.urlSlug === filter);
  const normalizeFilters = (filters: string[]): ApiFilter[] =>
    filters.map(filter => findFilter(filter));
  const paramFilters =
    new URLSearchParams(location.search)
      .get('filters')
      ?.split(',')
      .map(filter => findFilter(filter)) ?? [];

  const [filters, setFilters] = useState<ApiFilter[]>(paramFilters);
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

  interface FilterValue {}

  const handleFiltersSubmit = (values: FilterValue): void => {
    const temp = Object.values(values).flatMap(value => value);
    setFilters(normalizeFilters(temp));
  };

  useEffect(() => {
    // TODO: combine with search
    // setFilteredApis(
    //   apis.filter(api =>
    //     filters.every(filter => {
    //       if (
    //         (filter.type === 'topic' && filter.value === api.categoryUrlFragment) ||
    //         (filter.type === 'auth' && filter.value === api.oAuthInfo?.acgInfo?.sandboxAud) ||
    //         (filter.type === 'auth' && filter.value === api.oAuthInfo?.ccgInfo?.sandboxAud)
    //       ) {
    //         return true;
    //       }
    //       return false;
    //     }),
    //   ),
    // );
    // add search
    console.log(filters);
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
            <Form noValidate>
              <div className="filter-topic-container">
                {allFilters
                  .filter(filter => filter.type === 'category')
                  .map(category => (
                    <CheckboxRadioField
                      key={category.urlSlug}
                      label={category.name}
                      name={category.name}
                      type="checkbox"
                      value={category.urlSlug}
                    />
                  ))}
                <button type="submit">APPLY FILTERS</button>
              </div>
            </Form>
          </Formik>

          <Formik initialValues={initialFilters} onSubmit={handleFiltersSubmit}>
            <Form noValidate>
              <div className="filter-auth-container">
                {allFilters
                  .filter(filter => filter.type === 'auth')
                  .map(auth => (
                    <CheckboxRadioField
                      key={auth.urlSlug}
                      label={auth.name}
                      name={auth.name}
                      type="checkbox"
                      value={auth.urlSlug}
                    />
                  ))}
                <button type="submit">APPLY FILTERS</button>
              </div>
            </Form>
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

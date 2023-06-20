/* eslint-disable no-console */
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { ExploreApiCard, PageHeader } from '../../components';
import './ExploreRoot.scss';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { getAllApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

export interface FuzzyValues {
  search: string;
}

export const ExploreRoot = (): JSX.Element => {
  const [search, setSearch] = useState('');
  let apis = getAllApis();

  if (search) {
    const fuse = new Fuse(apis, {
      keys: ['name', 'description', 'releaseNotes', 'urlSlug', 'urlFragment'],
    });
    apis = fuse
      .search<APIDescription>(search)
      .map((api: Fuse.FuseResult<APIDescription>): APIDescription => api.item);
  }

  const initialFuzzy: FuzzyValues = {
    search,
  };
  console.log(initialFuzzy);
  console.log('Search: ', search);

  const handleFuzzySubmit = (
    values: FuzzyValues,
    // actions: FormikHelpers<FuzzyValues>,
  ): void => {
    setSearch(values.search);
    console.log('submitted: ', values);
  };

  return (
    <div className="explore-root-container">
      <PageHeader header="Explore our APIs" />
      <p className="vads-u-margin-y--0">
        View and sort our APIs to find the best one for your needs.
      </p>
      <div className="filters-container" data-cy="explore-filters">
        <div className="filter-controls">
          <select className="filter-size" name="topic" id="topic">
            <option value="topic-1">Topic 1</option>
            <option value="topic-2">Topic 2</option>
            <option value="topic-3">Topic 3</option>
          </select>
          <select className="filter-size" name="auth" id="auth">
            <option value="auth-1">Auth 1</option>
            <option value="auth-2">Auth 2</option>
            <option value="auth-3">Auth 3</option>
          </select>
          <Formik
            initialValues={initialFuzzy}
            onSubmit={handleFuzzySubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form noValidate>
              <Field
                id="fuzzy-search"
                className="va-api-text-field"
                name="search"
                required={false}
                aria-invalid={false}
                type="text"
                placeholder="Search APIs by keyword"
              />
              <button type="submit" className="display-inline vads-u-width--auto">
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
        <div data-cy="api-list" className="explore-main-container" role="list">
          {apis.map(api => (
            <ExploreApiCard
              description={api.description}
              filterTags={['PLACEHOLDER TAG']}
              key={api.urlSlug}
              name={api.name}
              urlSlug={api.urlSlug}
            />
          ))}
        </div>
      </ApisLoader>
    </div>
  );
};

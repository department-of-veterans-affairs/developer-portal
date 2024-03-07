import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SearchFilterValues {
  search: string;
}

interface SearchFiltersProps {
  handleSearchSubmit: (values: SearchFilterValues) => void;
  search: string;
}
export const SearchFilters = ({ handleSearchSubmit, search }: SearchFiltersProps): JSX.Element => {
  const initialSearch: SearchFilterValues = { search };

  return (
    <Formik
      initialValues={initialSearch}
      onSubmit={handleSearchSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form noValidate id="explore-page-fuzzy-search" name="explore-fuzzy-search">
        <Field
          id="fuzzy-search"
          className="va-api-text-field"
          name="search"
          required={false}
          aria-invalid={false}
          type="text"
          placeholder="Search APIs by keyword"
          aria-label="Search APIs by keyword"
        />
        <button type="submit" className="display-inline" aria-label="Submit Search">
          <FontAwesomeIcon icon={faSearch as IconProp} />
        </button>
      </Form>
    </Formik>
  );
};

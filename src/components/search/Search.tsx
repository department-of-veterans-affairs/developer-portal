import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

interface SearchTypes {
  inMenu?: boolean;
  className?: string;
}

const Search = (props: SearchTypes): JSX.Element => {
  const { inMenu, className } = props;

  return (
    <div className={classNames(
      'vads-u-display--flex',
      'vads-u-flex-direction--row',
      'vads-u-flex-wrap--nowrap',
      'vads-u-align-items--center',
      'va-api-search-wrapper',
      { 'va-api-search-form--inverse-color': !inMenu },
      className,
    )}>
      <form action="https://search.usa.gov/search"
        acceptCharset="UTF-8"
        method="get"
        className={classNames(
          'vads-u-display--flex',
          'vads-u-flex-direction--row',
          'vads-u-flex-wrap--nowrap',
          'vads-u-width--full',
          'medium-screen:vads-u-width--auto',
          { 'va-api-search-form--transparent-submit': !inMenu },
        )}
      >
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="affiliate" value="developer.va.gov" />
        <input type="text"
          name="query"
          autoComplete="off"
          className={classNames(
            'va-api-search-autocomplete',
            'vads-u-margin-y--0',
            'vads-u-padding--1',
          )}
          placeholder={inMenu ? '' : 'Search...'}
          aria-label="Search developer.va.gov" />
        <button type="submit" name="commit"
          className={classNames(
            inMenu ? [
              'va-api-search-submit',
              'vads-u-margin--0',
              'vads-u-padding--0',
            ] : [
              'vads-u-margin-bottom--0',
              'vads-u-margin-left--neg5',
              'vads-u-margin-right--0',
              'vads-u-margin-top--0',
              'vads-u-padding--0',
            ],
          )}
          value="Search"
          aria-label="Search"
        >
          <FontAwesomeIcon
            className={classNames({ 'va-api-search-icon': !inMenu })}
            icon={faSearch}
          />
        </button>
      </form>
    </div>
  );
};

export default Search;

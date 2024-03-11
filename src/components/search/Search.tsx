import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SearchTypes {
  inMenu?: boolean;
  className?: string;
}

const Search = (props: SearchTypes): JSX.Element => {
  const { inMenu, className } = props;

  return (
    <div
      className={classNames(
        'vads-u-display--flex',
        'vads-u-flex-direction--row',
        'vads-u-flex-wrap--nowrap',
        'vads-u-align-items--center',
        'va-api-search-wrapper',
        className,
      )}
    >
      <form
        action="https://search.usa.gov/search"
        acceptCharset="UTF-8"
        method="get"
        className={classNames(
          'vads-u-display--flex',
          'vads-u-flex-direction--row',
          'vads-u-flex-wrap--nowrap',
          'vads-u-width--full',
          'medium-screen:vads-u-width--auto',
        )}
      >
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="affiliate" value="developer.va.gov" />
        <input
          type="text"
          name="query"
          autoComplete="off"
          className={classNames(
            'va-api-search-autocomplete',
            'vads-u-margin-y--0',
            'vads-u-padding--1',
            'vads-u-color--base',
          )}
          placeholder={inMenu ? 'I’m looking for...' : 'Begin typing your search term here'}
          aria-label="Search developer.va.gov"
        />
        <button
          type="submit"
          name="commit"
          className={classNames('va-api-search-submit', 'vads-u-margin--0', 'vads-u-padding--1p5')}
          value="Search"
          aria-label="Search"
        >
          <FontAwesomeIcon className="va-api-search-icon" icon={faSearch as IconProp} />
        </button>
      </form>
    </div>
  );
};

export default Search;

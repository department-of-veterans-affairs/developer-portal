import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export default class Search extends React.Component {
  public render() {
    return (
      <div className="vadp-search-form">
      <FontAwesomeIcon className="va-api-search-icon" icon={faSearch} />
        <form action="https://search.usa.gov/search"
            acceptCharset="UTF-8" method="get">
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
          <input type="text"
            name="query"
            id="query"
            autoComplete="off"
            className="usagov-search-autocomplete vads-u-padding-left--4"
            placeholder="Search..."
            aria-label="Search developer.va.gov" />
        </form>
      </div>
    );
  }
}

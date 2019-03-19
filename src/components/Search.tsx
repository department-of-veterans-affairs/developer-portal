import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export class Search extends React.Component {
  public render() {
    return (
      <form id="search_form" className="vadp-search-form" action="https://search.usa.gov/search" 
          acceptCharset="UTF-8" method="get">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
        <input type="text" name="query" id="query" autoComplete="off" className="usagov-search-autocomplete" placeholder="Search developer.va.gov" />
        <button type="submit" name="commit" className="vadp-search-submit" value="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    );
  }
}

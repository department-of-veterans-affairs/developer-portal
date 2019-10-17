import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export default class Search extends React.Component<{className?: string}> {
  public render() {
    return (
      <form 
        className={classNames("vadp-search-form", this.props.className)}
        action="https://search.usa.gov/search"
        acceptCharset="UTF-8" 
        method="get"
      >
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="affiliate"  value="developer.va.gov" />
        <input type="text" 
          name="query" 
          autoComplete="off" 
          className="usagov-search-autocomplete" 
          placeholder="Search..." 
          aria-label="Search developer.va.gov" />
        <button type="submit" name="commit" className="vadp-search-submit" value="Search" aria-label="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    );
  }
}

import * as React from 'react';

export class Search extends React.Component {
  public render() {
    return (
      <form id="search_form" action="https://search.usa.gov/search" accept-charset="UTF-8" method="get">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
        <label htmlFor="query">Enter Search Term(s):</label>
        <input type="text" name="query" id="query" autoComplete="off" className="usagov-search-autocomplete" />
        <input type="submit" name="commit" value="Search" />
      </form>
    );
  }
}

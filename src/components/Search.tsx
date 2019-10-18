import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export default class Search extends React.Component<{inMenu?: boolean, className?: string}> {
  public render() {
    const { inMenu } = this.props;
    return (
      <div className={classNames(
        "vads-u-display--flex",
        "vads-u-flex-direction--row",
        "vads-u-flex-wrap--nowrap",
        "vads-u-align-items--center",
        "va-api-search-wrapper",
        {"va-api-search-form--inverse-color": !inMenu},
        this.props.className,
      )}>
        <form action="https://search.usa.gov/search"
            acceptCharset="UTF-8"
            method="get"
            className={classNames(
              "vads-u-display--flex",
              "vads-u-flex-direction--row",
              "vads-u-flex-wrap--nowrap",
              {"va-api-search-form--transparent-submit": !inMenu},
            )}>
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
          <input type="text"
            name="query"
            id="query"
            autoComplete="off"
            className="va-api-search-autocomplete"
            placeholder={inMenu ? "" : "Search..."}
            aria-label="Search developer.va.gov" />
          <button type="submit" name="commit" className={classNames({"va-api-search-submit": inMenu})}>
            <FontAwesomeIcon className={classNames({"va-api-search-icon": !inMenu})} icon={faSearch} />
          </button>
        </form>
      </div>
    );
  }
}

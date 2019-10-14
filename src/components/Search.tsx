import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export default class Search extends React.Component<{inMenu?: boolean, className?: string}> {
  public render() {
    const { inMenu } = this.props;
    const wrapperClassName = classNames("va-api-search-wrapper", this.props.className);
    const formClassName = classNames("va-api-search-form", {"va-api-search-form--transparent-submit": !inMenu});
    const wrapperClassNameModified = classNames(wrapperClassName, {"va-api-search-form--inverse-color": !inMenu});
    const iconClassName = classNames({"va-api-search-icon": !inMenu});
    const buttonClassName = classNames({"va-api-search-submit": inMenu});
    const placeholderText = inMenu ? "" : "Search...";

    return (
      <div className={wrapperClassNameModified}>
        <form action="https://search.usa.gov/search"
            acceptCharset="UTF-8"
            method="get"
            className={formClassName}>
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
          <input type="text"
            name="query"
            id="query"
            autoComplete="off"
            className='usagov-search-autocomplete'
            placeholder={placeholderText}
            aria-label="Search developer.va.gov" />
          <button type="submit" name="commit" className={buttonClassName}>
            <FontAwesomeIcon className={iconClassName} icon={faSearch} />
          </button>
        </form>
      </div>
    );
  }
}

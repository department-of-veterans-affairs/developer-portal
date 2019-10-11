import classNames from 'classnames';
import * as React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Search.scss';

export default class Search extends React.Component<{inMenu: boolean, className?: string}> {
  public static defaultProps = {
    inMenu: false,
  };

  public render() {
    const { inMenu } = this.props;
    const wrapperClassName = classNames("vadp-search-wrapper", this.props.className);
    const wrapperClassNameModified = inMenu ? wrapperClassName : classNames(wrapperClassName, "vadp-search-form--inverse-color");
    const inputClassName = inMenu ? classNames("usagov-search-autocomplete") : classNames("usagov-search-autocomplete", "vads-u-padding-left--4");
    const placeholderText = inMenu? "" : "Search...";

    return (
      <div className={wrapperClassNameModified}>
        {!inMenu && <FontAwesomeIcon className="va-api-search-icon" icon={faSearch} />}
        <form action="https://search.usa.gov/search"
            acceptCharset="UTF-8"
            method="get"
            className="vadp-search-form">
          <input name="utf8" type="hidden" value="&#x2713;" />
          <input type="hidden" name="affiliate" id="affiliate" value="developer.va.gov" />
          <input type="text"
            name="query"
            id="query"
            autoComplete="off"
            className={inputClassName}
            placeholder={placeholderText}
            aria-label="Search developer.va.gov" />
          {inMenu &&
          <button type="submit" name="commit" className="vadp-search-submit" value="Search" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          }
        </form>
      </div>
    );
  }
}

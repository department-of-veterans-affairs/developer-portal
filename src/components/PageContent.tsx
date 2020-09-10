import classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { SiteRoutes } from '../Routes';
import './PageContent.scss';

export default class PageContent extends React.Component<RouteComponentProps, {}> {
  private mainRef: React.RefObject<HTMLElement> = React.createRef<HTMLElement>();

  public componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;
    if (prevProps.location.pathname === location.pathname && location.hash) {
      return;
    }

    if (this.mainRef && this.mainRef.current) {
      this.mainRef.current.focus();
    }
    window.scrollTo(0, 0);
  }

  public render() {
    return (
      <main id="main" ref={this.mainRef} tabIndex={-1}>
        <Link
          to={window.location.pathname + window.location.search}
          className={classNames('va-api-skipnav', 'vads-u-padding-x--2', 'vads-u-padding-y--1', 'va-api-secondary-skipnav')}
          onClick={this.handleSkipNavClick}
        >
          Skip side navigation
        </Link>
        <SiteRoutes />
      </main>
    );
  }

  private handleSkipNavClick = (e: React. MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('h1')?.focus();
  };
}

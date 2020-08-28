import classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { SiteRoutes } from '../Routes';

export default class PageContent extends React.Component<RouteComponentProps, {}> {
  private mainRef: React.RefObject<HTMLMainElement> = React.createRef<HTMLMainElement>();
  private pageHeadingRef: React.RefObject<HTMLHeadingElement> = React.createRef<
    HTMLHeadingElement
  >();

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
        <HashLink
          to="#main"
          className={classNames('va-api-skipnav', 'vads-u-padding-x--2', 'vads-u-padding-y--1')}
          onClick={this.handleSkipNavClick}
        >
          Skip side navigation
        </HashLink>
        <SiteRoutes forwardedRef={this.pageHeadingRef} />
      </main>
    );
  }

  private handleSkipNavClick = () => {
    this.pageHeadingRef!.current!.focus();
  };
}

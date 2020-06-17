import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SiteRoutes } from '../Routes';

export default class PageContent extends React.Component<RouteComponentProps, {}> {
  private mainRef: React.RefObject<HTMLMainElement> = React.createRef<HTMLMainElement>();

  public componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;
    if (prevProps.location.pathname === location.pathname && location.hash) {
      return;
    }
    
    if (this.mainRef && this.mainRef.current) {
      this.mainRef.current.focus();
    }
    window.scrollTo(0,0);
  }

  public render() {
    return (
      <main id="main" ref={this.mainRef} tabIndex={-1}>
        <SiteRoutes />
      </main>
    );
  }
}

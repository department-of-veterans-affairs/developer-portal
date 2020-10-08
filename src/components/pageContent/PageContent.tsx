import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SiteRoutes } from '../../Routes';

const focusAndScroll = (elementToFocus: HTMLElement | null) => {
  if (elementToFocus) {
    elementToFocus.focus();
  }

  window.scrollTo(0, 0);
};

const PageContent = (props: RouteComponentProps): JSX.Element => {
  const mainRef = React.useRef<HTMLElement>(null);
  const prevLocationRef = React.useRef<string | null>(null);

  const { location } = props;

  React.useEffect(() => {
    const prevLocation: string | null = prevLocationRef.current;

    if (prevLocation === location.pathname && location.hash) {
      return;
    }

    if (prevLocationRef.current) {
      focusAndScroll(mainRef.current);
    }
    prevLocationRef.current = location.pathname;
  }, [location]);

  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <SiteRoutes />
    </main>
  );
};

PageContent.propTypes = {};

export { PageContent };

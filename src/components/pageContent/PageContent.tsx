import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import ErrorBoundaryPage from '../../containers/ErrorBoundaryPage';
import { SiteRoutes } from '../../Routes';

const focusAndScroll = (elementToFocus: HTMLElement | null): void => {
  if (elementToFocus) {
    elementToFocus.focus();
  }
  if (elementToFocus?.id === 'main') {
    window.scrollTo(0, 0);
  }
};

const PageContent = (): JSX.Element => {
  const mainRef = React.useRef<HTMLElement>(null);
  const prevPathRef = React.useRef<string | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    const prevPath: string | null = prevPathRef.current;

    if (prevPath !== location.pathname) {
      // Only focus and scroll if it's not an initial page load
      if (prevPath) {
        setTimeout(() => focusAndScroll(mainRef.current), 0);
      }
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <SiteRoutes />
      </ErrorBoundary>
    </main>
  );
};

PageContent.propTypes = {};

export { PageContent };

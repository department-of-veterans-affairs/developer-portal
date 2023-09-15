import React, { useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const ErrorBoundaryPage: React.FunctionComponent<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const location = useLocation();

  useEffect(() => {
    resetErrorBoundary();
  }, [location, resetErrorBoundary]);

  const { REACT_APP_SENTRY_DSN, REACT_APP_SENTRY_ENV } = process.env;
  if (REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: REACT_APP_SENTRY_DSN,
      environment: REACT_APP_SENTRY_ENV,
    });
    Sentry.captureException(error);
  }

  return <ErrorPage errorCode={400} error={error} />;
};

export default ErrorBoundaryPage;

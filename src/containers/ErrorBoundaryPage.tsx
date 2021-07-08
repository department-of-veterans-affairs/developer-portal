import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useHistory } from 'react-router';
import ErrorPage from './ErrorPage';

const ErrorBoundaryPage: React.FunctionComponent<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const history = useHistory();
  history.listen(() => {
    resetErrorBoundary();
  });

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

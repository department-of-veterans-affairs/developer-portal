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

  return <ErrorPage errorCode={400} error={error} />;
};

export default ErrorBoundaryPage;

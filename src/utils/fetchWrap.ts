import * as Sentry from "@sentry/browser";

export const fetchWrap = async (request: Request, errorFlag: string) => {
  try {
    const response = await fetch(request);
    if (!response.ok && response.status !== 400) {
      throw Error(response.statusText);
    }
    const json = await response.json() as Record<string, unknown>;
    if (json.errors) {
      throw Error(`${errorFlag}: ${json.errors.join(', ')}`);
    }
    if (json.token || json.clientID) {
      const result = dispatch(submitFormSuccess(json.token, json.clientID, json.clientSecret));
      history.push('/applied');
      return result;
    } else {
      return dispatch(submitFormError(json.errorMessage));
    }
  } catch (error) {
    Sentry.withScope(scope => {
      scope.setLevel(Sentry.Severity.fromString('warning'));
      Sentry.captureException(error);
    });
    return dispatch(submitFormError(error.message));
  }
};

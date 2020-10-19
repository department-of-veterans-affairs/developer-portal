import * as Sentry from "@sentry/browser";

const errorFunc = (error: string) => {
  Sentry.withScope(scope => {
    scope.setLevel(Sentry.Severity.fromString('warning'));
    Sentry.captureException(error);
  });
};

export const fetchWrap = async (request: Request, errorFlag: string) => {
  try {
    const response = await fetch(request);
    if (!response.ok && response.status !== 300 || 400 || 500) {
      throw Error(response.statusText);
    }
    const json = await response.json() as Record<string, unknown>;
    if (json.errors) {
      throw Error(`${errorFlag}: ${json.errors.join(', ')}`);
    }
  } catch (error) {
    errorFunc(error);
  }
  return;
};

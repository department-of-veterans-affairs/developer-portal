import * as Sentry from '@sentry/browser';

const errorFunc = (error: string, errorID: string) => {
  Sentry.withScope(scope => {
    scope.setTag('Error ID', errorID);
    Sentry.captureException(error);
  });
};
 
export const fetchWrap = async (request: Request, errorID: string) => {
  try {
    const response = await fetch(request);
    if ((!response.ok && response.status !== 300) || 400 || 500) {
      throw TypeError(`Front End Error ID: ${errorID}`);
    }
    return response;
    
  } catch (error) {
    return errorFunc(error, errorID);
  }
};


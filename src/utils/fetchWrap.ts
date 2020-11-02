import * as Sentry from '@sentry/browser';
import { v4 as uuidv4 } from 'uuid';
const sentryErrorLogger = (error: string, errorID: string, endpointUrl:string): void => {
  const pageName =  location.pathname;
  console.info(`sentry log:${error} - x-request-id: ${errorID}- endpointUrl:${endpointUrl} - pageName: ${pageName}`);
  Sentry.withScope(scope => {
    scope.setTag('Error ID', errorID);
    scope.setTag('Endpoint Url', endpointUrl);
    scope.setTag('Page Name', pageName);
    Sentry.captureException(error);
  });
};
const fetchMiddleware = (response: Response, errorDetails?: string): void => {
  console.log(response);
  if ((!response.ok && response.status !== 300)) {
    response.json().then(content=>{console.log('the json details get resolved');console.log(content);});
    throw TypeError(`HTTP Non Network Error: ${errorDetails||''}`);
  }
};
export const makeRequest = async (request: Request): Promise<Response> => {
  const requestId:string = uuidv4() as string;
  /* common headers */
  request.headers.append('X-Request-ID',requestId);
  try {
    const response = await fetch(request);
    fetchMiddleware(response, requestId);
    return response;
  } catch (error) {
    sentryErrorLogger(error, requestId, request.url);
    throw new Error(error);
  }
};
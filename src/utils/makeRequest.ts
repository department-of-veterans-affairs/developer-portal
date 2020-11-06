import * as Sentry from '@sentry/browser';
import { v4 as uuidv4 } from 'uuid';
​
// Interfaces & Constants

interface CallFetchConfig {
  responseType: string;
}
​
export interface HttpResponse<T> {
  ok: boolean;
  status: number;
  body: T | string | null;
}

export enum responseType {
  BLOB = 'BLOB',
  JSON = 'JSON',
  TEXT = 'TEXT',
}
​
// Sends errors to Sentry

const sentryErrorLogger = (error: string, errorID: string, endpointUrl: string): void => {
  const pageName = location.pathname;
  
  Sentry.withScope(scope => {
    scope.setTag('Error ID', errorID);
    scope.setTag('Endpoint Url', endpointUrl);
    scope.setTag('Page Name', pageName);
    Sentry.captureException(error);
  });
};
​
// Handles non network errors (response not ok and status not 200) and logs them to Sentry 

const handleNonNetworkError = async( url: string, requestId: string,  type: string, response: Response): Promise<HttpResponse> => {
​
  // Tries to resolve the response to obtain error details
  let responseBody: any | string | null;
​
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    responseBody = (response.headers.get('Content-type')?.indexOf('application/json') !== -1) ? await response.json() : await response.text();
  } catch(e){
    responseBody = null;
  }
​
  // Create sentry errors based on status
  if(response.status === 400 && type === responseType.JSON && responseBody?.errors){
    sentryErrorLogger(`Validation errors: ${responseBody?.errors?.join(', ')}`, requestId, url);
  } else if(response.status === 404){
    sentryErrorLogger(`API not found: ${response.status}`, requestId, url);
  } else if(response.status>=500 && response.status<=599){
    sentryErrorLogger(`Server Error:${response.status}`, requestId, url);
  } 
​
  // All http codes outside the 200 range will be rejected
  return Promise.reject({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body: responseBody,
    ok:response.ok,
    status:response.status,
  });
};
​
// Fetch common logic 
export const makeRequest = async (url:string, requestInit: RequestInit, config:CallFetchConfig = { responseType: responseType.JSON }): Promise<HttpResponse> => {
​
  const request = new Request(url, requestInit);
  const requestId: string = uuidv4() ;
  
  // Common Headers
  request.headers.append('X-Request-ID', requestId);
​
​
  try{
    const response = await fetch(request);
​
    let responseBody: any | string |null;
​
    if(!response.ok){
      return handleNonNetworkError(url, requestId, config.responseType,  response );
    }
 
    if(config.responseType === responseType.JSON){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseBody = await response.json(); 
    }
​
    if(config.responseType === responseType.TEXT){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseBody = await response.text(); 
    }
​
    if(config.responseType === responseType.BLOB){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseBody = await response.blob();
    }
   
    const httpResponse:HttpResponse  = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: responseBody,
      ok: response.ok,
      status:response.status,
    };
​
    return Promise.resolve(httpResponse);   
​
  } catch (error) {
    sentryErrorLogger(error, requestId, url);
    throw new Error(error);
  }
};

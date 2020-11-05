import * as Sentry from '@sentry/browser';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interfaces & Constants
 */
interface CallFetchConfig {
  responseType:string;
}

export interface HttpResponse {
  ok: boolean;
  status: number;
  body: any | string | null;
}

export const responseType = {
  BLOB: 'BLOB',
  JSON: 'JSON',
  TEXT: 'TEXT',
};

/**
 * Sends errors to Sentry
 */
const sentryErrorLogger = (error: string, errorID: string, endpointUrl: string): void => {
  const pageName = location.pathname;
  Sentry.withScope(scope => {
    scope.setTag('Error ID', errorID);
    scope.setTag('Endpoint Url', endpointUrl);
    scope.setTag('Page Name', pageName);
    Sentry.captureException(error);
  });
};

/**
 * Handles non network errors (response not ok and status not 200) and logs them to Sentry 
 */
const handleNonNetworkError = ( url: string, requestId: string,  type: string, response: HttpResponse): void => {
  if(!response.ok){
    if(response.status === 400 && type === responseType.JSON && response?.body?.errors){
      sentryErrorLogger(`Validation errors: ${response?.body?.errors?.join(', ')}`, requestId, url);
    }
    else if(response.status>=500 && response.status<=599){
      // double check if it will be better to reject the errors in the 500 range
      sentryErrorLogger(`Server Error:${response.status}`, requestId, url);
    } 
  }
};

/**
 * Fetch common logic 
 */
export const makeRequest = async (url:string, requestInit: RequestInit, config:CallFetchConfig = { responseType: responseType.JSON }): Promise<HttpResponse> => {

  const request = new Request(url, requestInit);
  const requestId: string = uuidv4() as string;
  
  /* common headers */
  request.headers.append('X-Request-ID', requestId);

  try {
    const response = await fetch(request);

    let responseBody: any | string |null;

    if(config.responseType === responseType.JSON){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseBody = await response.json(); 
    }

    if(config.responseType === responseType.TEXT){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      responseBody = await response.text(); 
    }

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

    handleNonNetworkError(url, requestId, config.responseType,  httpResponse );
    return Promise.resolve(httpResponse);   

  } catch (error) {
    sentryErrorLogger(error, requestId, url);
    throw new Error(error);
  }
};

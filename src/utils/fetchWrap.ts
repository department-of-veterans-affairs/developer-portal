import * as Sentry from '@sentry/browser';
import { v4 as uuidv4 } from 'uuid';

let newID = uuidv4();
let newHeaders = new Headers();
newHeaders.append('reqID', newID);

const newInit = {
  cache: 'default',
  headers: newHeaders,
  method: 'GET',
  mode: 'cors',
};

const debugURL = 'http://localhost:3030/url';

const request = new Request(debugURL, newInit);

const errorFunc = (error: string) => {
  Sentry.withScope(scope => {
    scope.setTag('Error ID', newID);
    Sentry.captureException(error);
  });
};

export const fetchWrap = async (request: Request) => {
  try {
    const response = await fetch(request);
    if ((!response.ok && response.status !== 300) || 400 || 500) {
      throw TypeError(`Front End Error ID: ${newID}`);
    }
    
  } catch (error) {
    errorFunc(error);
  }
  return;
};

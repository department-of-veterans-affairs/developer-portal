import * as Sentry from '@sentry/browser';
import { v4 as uuidv4 } from 'uuid';


// ===== Start page specific data ===== 
const newID: string = uuidv4();
const newHeaders = new Headers();
newHeaders.append('reqID', newID);

const newInit: RequestInit = {
  cache: 'default',
  headers: newHeaders,
  method: 'GET',
  mode: 'cors',
};

const debugURL = 'http://localhost:3030/url';

export const fetchRequest = new Request(debugURL, newInit);

// ===== End page specific data =====

const errorFunc = (error: string) => {
  Sentry.withScope(scope => {
    scope.setTag('Error ID', newID);
    Sentry.captureException(error);
  });
};

export const fetchWrap = async (request: Request) => {
  console.time('timer starts');
  try {
    const response = await fetch(request);
    if ((!response.ok && response.status !== 300) || 400 || 500) {
      throw TypeError(`Front End Error ID: ${newID}`);
    }
    return response;
    
  } catch (error) {
    return errorFunc(error);
  } finally {
    // not sure what to do here. Timer for science.
    console.timeEnd('timer ends');
  }
};


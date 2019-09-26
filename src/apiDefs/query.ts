/*
  This file contains the core functionality for interacting with our API definitions. We intend to
  move our API definitions to a database in the future so we do not have to maintain them in 
  Typescript as the program scales (see schema.ts for more info). In preparation for this change,
  developers should not write new code that relies directly on the Typescript objects exported from other
  files in this directory. Instead, they should rely on the functions exported from this file and the other
  modules listed below to abstract away the form of data storage.

  The following modules supplement the core data access functions defined here. They can be safely consumed 
  by React components, Redux lifecycle hooks, and other parts of the application outside src/apiDefs.
  - deprecated.ts
  - env.ts 
  - schema.ts
*/

import apiDefs, { apiCategoryOrder } from './data/categories';
import {
  IApiCategory,
  IApiDescription,
} from './schema';

const getApiDefinitions = () => apiDefs;
const getApiCategoryOrder = () => apiCategoryOrder;

function lookupApiByFragment(urlFragment: string): IApiDescription | null {
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (api.urlFragment === urlFragment) {
        return api;
      }
    }
  }
  
  return null;
}
  
function lookupApiCategory(categoryKey: string): IApiCategory | null {
  return apiDefs[categoryKey];
}

function categoriesFor(apiList: string[]): IApiCategory[] {
  const categories = new Set();
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (apiList.includes(api.urlFragment)) {
        categories.add(cat);
      }
    }
  }
  return Array.from(categories);
}

function apisFor(apiList: string[]): IApiDescription[] {
  const apis = new Set();
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (apiList.includes(api.urlFragment)) {
        apis.add(api);
      }
    }
  }
  return Array.from(apis);
}

function includesOauthAPI(apiList: string[]): boolean {
  const includesOauthCategory = categoriesFor(apiList).some(category => !category.apiKey);
  const includesOauthOverride = apisFor(apiList).some(api => api.oAuth || false);
  return includesOauthCategory || includesOauthOverride;
}

// If an API with the given URL fragment exists, the given `fn` callback
// function will be called with the full IApiDescription. The return value is
// either the return value of the callback function or `null` if no such API
// exists.
function withApiDescription(
  urlFragment: string,
  fn: (apiDesc: IApiDescription) => any,
): any {
  const api = lookupApiByFragment(urlFragment);
  if (api == null) {
    return null;
  }
  
  return fn(api);
}

export {
  getApiCategoryOrder,
  getApiDefinitions,
  lookupApiByFragment,
  lookupApiCategory,
  includesOauthAPI,
  withApiDescription,
};
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
import { IApiCategory, IApiDescription } from './schema';

const getApiDefinitions = () => apiDefs;
const getApiCategoryOrder = () => apiCategoryOrder;

const getAllApis = (): IApiDescription[] => {
  return Object.values(apiDefs).flatMap((category: IApiCategory) => category.apis);
};

function lookupApiByFragment(apiKey: string): IApiDescription | null {
  const hasMatchingIdentifier = (apiDesc: IApiDescription): boolean =>
    apiDesc.urlFragment === apiKey;
  const apiResult = getAllApis().find(hasMatchingIdentifier);
  return apiResult || null;
}

function lookupApiCategory(categoryKey: string): IApiCategory | null {
  return apiDefs[categoryKey] || null;
}

const apiToCategoryMapping: { [key: string]: IApiCategory } = Object.keys(apiDefs).reduce(
  (mapping: {}, categoryKey: string) => {
    for (const api of apiDefs[categoryKey].apis) {
      mapping[api.urlFragment] = apiDefs[categoryKey];
    }
    return mapping;
  },
  {},
);

function categoriesFor(apiList: string[]): IApiCategory[] {
  const categories: Set<IApiCategory> = new Set<IApiCategory>();
  for (const apiKey of apiList) {
    categories.add(apiToCategoryMapping[apiKey]);
  }
  return Array.from(categories);
}

function apisFor(apiList: string[]): IApiDescription[] {
  const allApis = getAllApis();
  const searchedApiSet = new Set<string>(apiList);
  return allApis.filter((api: IApiDescription) => searchedApiSet.has(api.urlFragment));
}

function includesOauthAPI(apiList: string[]): boolean {
  const includesOauthCategory = categoriesFor(apiList).some(category => !category.apiKey);
  const includesOauthOverride = apisFor(apiList).some(api => api.oAuth || false);
  return includesOauthCategory || includesOauthOverride;
}

export {
  getAllApis,
  getApiCategoryOrder,
  getApiDefinitions,
  lookupApiByFragment,
  lookupApiCategory,
  includesOauthAPI,
};

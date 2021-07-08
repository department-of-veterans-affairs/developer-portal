/**
 * This file contains the core functionality for interacting with our API definitions. We intend to
 * move our API definitions to a database in the future so we do not have to maintain them in
 * Typescript as the program scales (see schema.ts for more info). In preparation for this change,
 * developers should not write new code that relies directly on the Typescript objects exported from
 * other files in this directory. Instead, they should rely on the functions exported from this file
 * and the other modules listed below to abstract away the form of data storage.
 *
 * The following modules supplement the core data access functions defined here. They can be safely consumed
 * by React components, Redux lifecycle hooks, and other parts of the application outside src/apiDefs.
 * - deprecated.ts
 * - env.ts
 * - schema.ts
 */

import apiDefs, { apiCategoryOrder } from './data/categories';
import { APICategories, APICategory, APIDescription } from './schema';

const getApiDefinitions = (): APICategories => apiDefs;
const getApiCategoryOrder = (): string[] => apiCategoryOrder;

const getAllApis = (): APIDescription[] =>
  Object.values(getApiDefinitions()).flatMap((category: APICategory) => category.apis);

const getAllOauthApis = (): APIDescription[] =>
  getAllApis()
    .filter((item: APIDescription) => !!item.oAuth)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

const getAllKeyAuthApis = (): APIDescription[] =>
  getAllApis()
    .filter((item: APIDescription) => !item.oAuth)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

const getAllQuickstartCategorySlugs = (): string[] =>
  Object.entries(getApiDefinitions())
    .filter((item: [string, APICategory]) => !!item[1].content.quickstart)
    .map((item: [string, APICategory]) => item[0]);

const lookupApiByFragment = (apiKey: string): APIDescription | null => {
  const hasMatchingIdentifier = (apiDesc: APIDescription): boolean =>
    apiDesc.urlFragment === apiKey;
  const apiResult = getAllApis().find(hasMatchingIdentifier);
  return apiResult ?? null;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- should check category existence
const lookupApiCategory = (categoryKey: string): APICategory | null => apiDefs[categoryKey] ?? null;

const apisFor = (apiList: string[]): APIDescription[] => {
  const allApis = getAllApis();
  const searchedApiSet = new Set<string>(apiList);
  return allApis.filter((api: APIDescription) => searchedApiSet.has(api.urlFragment));
};

const includesOAuthAPI = (apiList: string[]): boolean => apisFor(apiList).some(api => !!api.oAuth);

export {
  getAllApis,
  getAllOauthApis,
  getAllQuickstartCategorySlugs,
  getApiCategoryOrder,
  getApiDefinitions,
  lookupApiByFragment,
  lookupApiCategory,
  includesOAuthAPI,
  getAllKeyAuthApis,
};

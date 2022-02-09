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

import store from '../store';
import { isHostedApiEnabled } from './env';
import { isApiDeactivated } from './deprecated';
import { APICategories, APICategory, APIDescription, VaInternalOnly } from './schema';
import * as rootGetApiDefinitions from './getApiDefinitions';

const getApiDefinitions = (): APICategories => rootGetApiDefinitions.getApiDefinitions();

const getApisLoaded = (): boolean => {
  const state = store.getState();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return state.apiList.loaded;
};

const getApiCategoryOrder = (): string[] => Object.keys(rootGetApiDefinitions.getApiDefinitions());

const getActiveApiDefinitions = (): APICategories => {
  const output: APICategories = {};
  const definitions = rootGetApiDefinitions.getApiDefinitions();
  Object.keys(definitions).forEach((key: string) => {
    const apis: APIDescription[] = definitions[key].apis.filter(
      (api: APIDescription) =>
        isHostedApiEnabled(api.urlFragment, api.enabledByDefault) && !isApiDeactivated(api),
    );
    output[key] = {
      ...definitions[key],
      apis,
    };
  });

  return output;
};

const getAllApis = (): APIDescription[] =>
  Object.values(rootGetApiDefinitions.getApiDefinitions())
    .flatMap((category: APICategory) => category.apis)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
const getActiveApis = (): APIDescription[] =>
  getAllApis().filter((api: APIDescription) =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );

const getActiveKeyAuthApis = (): APIDescription[] =>
  getActiveApis().filter((item: APIDescription) => !item.oAuth);
const getAllOauthApis = (): APIDescription[] =>
  getAllApis().filter((item: APIDescription) => !!item.oAuth);

const getActiveOauthApis = (): APIDescription[] =>
  getAllOauthApis().filter((api: APIDescription) =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );
const getAllAuthCodeApis = (): APIDescription[] =>
  getAllOauthApis().filter((item: APIDescription) =>
    item.oAuthTypes?.includes('AuthorizationCodeGrant'),
  );
const getActiveAuthCodeApis = (): APIDescription[] =>
  getAllAuthCodeApis().filter((api: APIDescription) =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );
const getAllCCGApis = (): APIDescription[] =>
  getAllOauthApis().filter((item: APIDescription) =>
    item.oAuthTypes?.includes('ClientCredentialsGrant'),
  );
const getActiveCCGApis = (): APIDescription[] =>
  getAllCCGApis().filter((api: APIDescription) =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );
const getAllKeyAuthApis = (): APIDescription[] =>
  getAllApis().filter((item: APIDescription) => !item.oAuth);

const getAllQuickstartCategorySlugs = (): string[] =>
  Object.entries(rootGetApiDefinitions.getApiDefinitions())
    .filter((item: [string, APICategory]) => !!item[1].content.quickstart)
    .map((item: [string, APICategory]) => item[0]);

const lookupApiByFragment = (apiKey: string): APIDescription | null => {
  const hasMatchingIdentifier = (apiDesc: APIDescription): boolean =>
    apiDesc.urlFragment === apiKey;
  const apiResult = getAllApis().find(hasMatchingIdentifier);
  return apiResult ?? null;
};

const lookupApiCategory = (categoryKey: string): APICategory | null =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  rootGetApiDefinitions.getApiDefinitions()[categoryKey] ?? null;

const apisFor = (
  selectedApiList: string[],
  authRegex: RegExp = /^(acg|apikey|ccg)\/[a-z]{1}/,
): APIDescription[] => {
  const allApis = getAllApis();
  const searchedApiSet = new Set<string>(selectedApiList);
  return allApis.filter((api: APIDescription) => {
    if (searchedApiSet.has(api.urlFragment) || searchedApiSet.has(api.altID ?? '')) {
      return true;
    }
    return selectedApiList.some((item: string) => {
      if (!authRegex.test(item)) {
        return false;
      }
      const pieces = item.split('/');
      return api.altID === pieces[1];
    });
  });
};

const includesOAuthAPI = (apiList: string[]): boolean => apisFor(apiList).some(api => !!api.oAuth);
const includesAuthCodeAPI = (apiList: string[]): boolean =>
  !!apisFor(apiList, /^acg\/[a-z]{1}/).some(
    api => !!api.oAuthTypes?.includes('AuthorizationCodeGrant'),
  );
const includesCcgAPI = (apiList: string[]): boolean =>
  !!apisFor(apiList, /^ccg\/[a-z]{1}/).some(
    api => !!api.oAuthTypes?.includes('ClientCredentialsGrant'),
  );
const includesInternalOnlyAPI = (apiList: string[]): boolean =>
  apisFor(apiList).some(api => api.vaInternalOnly);

const includesInternalSponsorshipAPI = (apiList: string[]): boolean =>
  apisFor(apiList).some(api => api.vaInternalOnly === VaInternalOnly.AdditionalDetails);

const onlyOpenDataAPIs = (apiList: string[]): boolean =>
  apisFor(apiList).every(api => api.openData);

export {
  apisFor,
  getActiveKeyAuthApis,
  getActiveOauthApis,
  getApisLoaded,
  getAllApis,
  getAllOauthApis,
  getAllAuthCodeApis,
  getActiveAuthCodeApis,
  getAllCCGApis,
  getActiveCCGApis,
  getAllQuickstartCategorySlugs,
  getApiCategoryOrder,
  getApiDefinitions,
  getActiveApiDefinitions,
  lookupApiByFragment,
  lookupApiCategory,
  includesOAuthAPI,
  includesAuthCodeAPI,
  includesCcgAPI,
  getAllKeyAuthApis,
  includesInternalOnlyAPI,
  includesInternalSponsorshipAPI,
  onlyOpenDataAPIs,
};

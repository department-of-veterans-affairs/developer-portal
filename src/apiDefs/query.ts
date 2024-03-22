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
import { apiLoadingState } from '../types/constants';
import { attestationApis } from '../containers/consumerOnboarding/validationSchema';
import { isHostedApiEnabled } from './env';
import { isApiDeactivated } from './deprecated';
import { APICategories, APICategory, APIDescription, VaInternalOnly } from './schema';
import * as rootGetApiDefinitions from './getApiDefinitions';

const getApiDefinitions = (): APICategories => rootGetApiDefinitions.getApiDefinitions();

const getApisLoadedState = (): string => {
  const state = store.getState();
  if (state.apiList.loaded) {
    return apiLoadingState.LOADED;
  } else if (state.apiList.error) {
    return apiLoadingState.ERROR;
  } else {
    return apiLoadingState.IN_PROGRESS;
  }
};

const getApisLoaded = (): boolean => {
  const state = store.getState();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return state.apiList.loaded;
};

const lookupApiCategoryBySlug = (urlSlug: string): APICategory | null => {
  const categories: APICategories = rootGetApiDefinitions.getApiDefinitions();
  const hasMatchingIdentifier = (category: APICategory): boolean => category.urlSlug === urlSlug;
  return Object.values(categories).find(hasMatchingIdentifier) ?? null;
};

const lookupApiCategory = (categoryKey: string): APICategory =>
  rootGetApiDefinitions.getApiDefinitions()[categoryKey];

const countActiveApisByCategory = (categoryKey: string): number => {
  const activeApis = rootGetApiDefinitions
    .getApiDefinitions()
    [categoryKey].apis.filter(
      (api: APIDescription) =>
        isHostedApiEnabled(api.urlFragment, api.enabledByDefault) && !isApiDeactivated(api),
    );
  return activeApis.length;
};

const getApiCategoryOrder = (): string[] => {
  // return the urlFragments of the categories sorted by category name
  const urlFragments = Object.keys(rootGetApiDefinitions.getApiDefinitions());
  return urlFragments.sort((a: string, b: string) => {
    const cat1 = lookupApiCategory(a);
    const cat2 = lookupApiCategory(b);
    return cat1.name < cat2.name ? -1 : 0;
  });
};

const getAllApis = (includeStealth: boolean = false): APIDescription[] =>
  Object.values(rootGetApiDefinitions.getApiDefinitions())
    .flatMap((category: APICategory) => category.apis)
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((api: APIDescription) => !api.isStealthLaunched || includeStealth);
const getActiveApis = (): APIDescription[] =>
  getAllApis().filter(
    (api: APIDescription) =>
      isHostedApiEnabled(api.urlFragment, api.enabledByDefault) && !isApiDeactivated(api),
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

const lookupApiBySlug = (urlSlug: string): APIDescription | null => {
  const hasMatchingIdentifier = (apiDesc: APIDescription): boolean => apiDesc.urlSlug === urlSlug;
  const apiResult = getAllApis(true).find(hasMatchingIdentifier);
  return apiResult ?? null;
};
const lookupApiByFragment = (apiKey: string): APIDescription | null => {
  const hasMatchingIdentifier = (apiDesc: APIDescription): boolean =>
    apiDesc.urlFragment === apiKey;
  const apiResult = getAllApis(true).find(hasMatchingIdentifier);
  return apiResult ?? null;
};

const lookupAttestationApi = (api: string): APIDescription | undefined =>
  getAllApis().find((a: APIDescription) => a.altID === api || a.urlSlug === api);

const lookupAttestationIdentifier = (apis: string[]): string | undefined =>
  attestationApis.find(api => apis.includes(api));

const apisFor = (
  selectedApiList: string[],
  authRegex: RegExp = /^(acg|apikey|ccg)\/[a-z]{1}/,
): APIDescription[] => {
  const allApis = getAllApis();
  const searchedApiSet = new Set<string>(selectedApiList);
  return allApis.filter((api: APIDescription) => {
    if (searchedApiSet.has(api.urlSlug) || searchedApiSet.has(api.altID ?? '')) {
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

const includesOpenDataAPI = (apiList: string[]): boolean =>
  apisFor(apiList).some(api => api.openData);

const isApiKeyApi = (api: APIDescription): boolean => !api.oAuth;
const isAcgApi = (api: APIDescription): boolean =>
  !!api.oAuthTypes?.includes('AuthorizationCodeGrant');
const isCcgApi = (api: APIDescription): boolean =>
  !!api.oAuthTypes?.includes('ClientCredentialsGrant');

export {
  apisFor,
  countActiveApisByCategory,
  getActiveApis,
  getActiveKeyAuthApis,
  getActiveOauthApis,
  getApisLoadedState,
  getApisLoaded,
  getAllApis,
  getAllOauthApis,
  getAllAuthCodeApis,
  getActiveAuthCodeApis,
  getAllCCGApis,
  getActiveCCGApis,
  getApiCategoryOrder,
  getApiDefinitions,
  lookupApiByFragment,
  lookupApiBySlug,
  lookupApiCategory,
  lookupApiCategoryBySlug,
  includesOAuthAPI,
  includesAuthCodeAPI,
  includesCcgAPI,
  isApiKeyApi,
  isAcgApi,
  isCcgApi,
  getAllKeyAuthApis,
  includesInternalOnlyAPI,
  includesInternalSponsorshipAPI,
  onlyOpenDataAPIs,
  includesOpenDataAPI,
  lookupAttestationApi,
  lookupAttestationIdentifier,
};

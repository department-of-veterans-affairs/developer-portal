import createFlags from 'flag';
import { getDeactivatedFlags } from './apiDefs/deprecated';
import { getCategoryFlags, getEnvFlags } from './apiDefs/env';
import { getAllApis } from './apiDefs/query';
import { APIDescription } from './apiDefs/schema';

export interface AppFlags {
  api_publishing: boolean;
  auth_docs_v2: boolean;
  categories: { [categoryId: string]: boolean };
  deactivated_apis: { [apiId: string]: boolean };
  enabled: { [apiId: string]: boolean };
  hosted_apis: { [apiId: string]: boolean };
  show_testing_notice: boolean;
  signups_enabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { Flag, FlagsProvider, useFlag } = createFlags<AppFlags>();
const getFlags = (): AppFlags => {
  const deactivatedFlags = getDeactivatedFlags();
  const envFlags = getEnvFlags();
  const apiCategories = getCategoryFlags();
  const apiFlags = getAllApis().reduce((result, api: APIDescription): {
    [key: string]: boolean;
  } => {
    const isApiAvailable = envFlags[api.urlFragment] && !deactivatedFlags[api.urlFragment];
    result[api.urlFragment] = isApiAvailable;
    return result;
  }, {});

  return {
    api_publishing: process.env.REACT_APP_API_PUBLISHING === 'true',
    auth_docs_v2: process.env.REACT_APP_AUTH_DOCS_V2 === 'true',
    categories: apiCategories,
    deactivated_apis: deactivatedFlags,
    enabled: envFlags,
    hosted_apis: apiFlags,
    show_testing_notice: process.env.REACT_APP_SHOW_TESTING_NOTICE === 'true',
    signups_enabled: process.env.REACT_APP_SIGNUPS_ENABLED !== 'false',
  };
};

export { Flag, FlagsProvider, getFlags, useFlag };

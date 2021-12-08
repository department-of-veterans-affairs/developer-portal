import createFlags from 'flag';
import { getDeactivatedFlags } from './apiDefs/deprecated';
import { getCategoryFlags, getEnvFlags } from './apiDefs/env';
import { getAllApis } from './apiDefs/query';
import { APIDescription } from './apiDefs/schema';
import {
  FLAG_CATEGORIES,
  FLAG_DEACTIVATED_APIS,
  FLAG_ENABLED_APIS,
  FLAG_HOSTED_APIS,
  FLAG_PLATFORM_OUTAGE,
  FLAG_SHOW_TESTING_NOTICE,
  FLAG_POST_TO_LPB,
} from './types/constants';

export interface AppFlags {
  categories: { [categoryId: string]: boolean };
  deactivated_apis: { [apiId: string]: boolean };
  enabled: { [apiId: string]: boolean };
  hosted_apis: { [apiId: string]: boolean };
  show_testing_notice: boolean;
  platform_outage: boolean;
  post_to_lpb: boolean;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { Flag, FlagsProvider, useFlag } = createFlags<AppFlags>();
const getFlags = (): AppFlags => {
  const deactivatedFlags = getDeactivatedFlags();
  const envFlags = getEnvFlags();
  const apiCategories = getCategoryFlags();
  const apiFlags = getAllApis().reduce(
    (
      result,
      api: APIDescription,
    ): {
      [key: string]: boolean;
    } => {
      const isApiAvailable = envFlags[api.urlFragment] && !deactivatedFlags[api.urlFragment];
      result[api.urlFragment] = isApiAvailable;
      return result;
    },
    {},
  );

  return {
    [FLAG_CATEGORIES]: apiCategories,
    [FLAG_DEACTIVATED_APIS]: deactivatedFlags,
    [FLAG_ENABLED_APIS]: envFlags,
    [FLAG_HOSTED_APIS]: apiFlags,
    [FLAG_PLATFORM_OUTAGE]: process.env.REACT_APP_PLATFORM_OUTAGE === 'true',
    [FLAG_POST_TO_LPB]: process.env.REACT_APP_POST_TO_LPB === 'true',
    [FLAG_SHOW_TESTING_NOTICE]: process.env.REACT_APP_SHOW_TESTING_NOTICE === 'true',
  };
};

export { Flag, FlagsProvider, getFlags, useFlag };

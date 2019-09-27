import { getDeprecatedFlags } from './deprecated';
import { getApiEnvFlags } from './env';
import { getAllApis } from './query';
import { IApiDescription } from './schema';

const deprecatedFlags = getDeprecatedFlags();
const envFlags = getApiEnvFlags();

const isApiAvailable = (api: IApiDescription): boolean => {
  return envFlags[api.urlFragment] && !deprecatedFlags[api.urlFragment];
};

const availableFlags = getAllApis().reduce((flags: {}, api: IApiDescription) => {
  return {
    ... flags,
    [api.urlFragment]: isApiAvailable(api),
  };
}, {});

export default () => { 
  return {
    deprecated: deprecatedFlags,
    enabled: envFlags,
    hosted_apis: availableFlags,
  };
};
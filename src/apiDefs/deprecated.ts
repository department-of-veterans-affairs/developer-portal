import * as moment from 'moment';
import { getAllApis, lookupApiByFragment } from './query';
import { IApiDescription } from "./schema";

export const isApiDeprecated = (api: IApiDescription | string) : boolean => {
  // the string branch of this function exists mainly to serve the apiEnvFlags computation
  // in env.ts. we may want to remove it in the future.
  if (typeof api === 'string') {
    const apiResult = lookupApiByFragment(api);
    if (apiResult === null) {
      return false;
    }

    api = apiResult;
  }

  if (api.deprecated === undefined) {
    return false;
  }

  if (moment.isMoment(api.deprecated)) {
    return moment().isAfter(api.deprecated);
  }

  return api.deprecated;
};

export const getDeprecatedFlags = () => {
  return getAllApis().reduce((flags: {}, api: IApiDescription) => {
    flags[api.urlFragment] = isApiDeprecated(api);
    return flags;
  }, {});
};

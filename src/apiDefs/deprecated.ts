import * as moment from 'moment';
import apiDefinitions from './data/categories';
import { IApiDescription } from "./schema";

const getAllApis = () : IApiDescription[] => Object.values(apiDefinitions).flat();

export const isApiDeprecated = (api: IApiDescription | string) : boolean => {
  // the string branch of this function exists mainly to serve the apiEnvFlags computation
  // in env.ts. we may want to remove it in the future.
  if (typeof api === 'string') {
    const apiResult = getAllApis().find((apiDesc: IApiDescription) : boolean => apiDesc.urlFragment === api);
    if (!apiResult) {
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

export const getDeprecatedApis = () : IApiDescription[] => {
  return getAllApis().filter(isApiDeprecated);
};

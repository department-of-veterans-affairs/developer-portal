import * as moment from 'moment';
import { getAllApis } from './query';
import { IApiDescription } from "./schema";

export const isApiDeprecated = (api: IApiDescription): boolean => {
  if (api.removalInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.removalInfo.deprecationDate);
};

export const isApiRemoved = (api: IApiDescription): boolean => {
  if (api.removalInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.removalInfo.removalDate);
};

export const getDeprecatedFlags = () => {
  return getAllApis().reduce((flags: {}, api: IApiDescription) => {
    flags[api.urlFragment] = isApiDeprecated(api);
    return flags;
  }, {});
};

export const getRemovedFlags = () => {
  return getAllApis().reduce((flags: {}, api: IApiDescription) => {
    flags[api.urlFragment] = isApiRemoved(api);
    return flags;
  }, {});
};

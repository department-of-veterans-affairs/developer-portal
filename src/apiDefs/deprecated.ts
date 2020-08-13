import * as moment from 'moment';
import { getAllApis } from './query';
import { IApiDescription } from "./schema";

export const isApiDeprecated = (api: IApiDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.deactivationInfo.deprecationDate);
};

export const isApiDeactivated = (api: IApiDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.deactivationInfo.deactivationDate);
};

export const getDeprecatedFlags = () => {
  return getAllApis().reduce((flags: {}, api: IApiDescription) => {
    flags[api.urlFragment] = isApiDeprecated(api);
    return flags;
  }, {});
};

export const getDeactivatedFlags = () => {
  return getAllApis().reduce((flags: {}, api: IApiDescription) => {
    flags[api.urlFragment] = isApiDeactivated(api);
    return flags;
  }, {});
};

export const getDeactivatedCategory = () => ({
  deactivated: {
    apis: getAllApis().filter((api: IApiDescription) => isApiDeactivated(api)),
    buttonText: 'Deactivated APIs',
    name: 'Deactivated APIs',
    properName: 'deactivated',
  },
});

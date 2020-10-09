import moment from 'moment';
import { getAllApis } from './query';
import { APIDescription, BaseAPICategory } from './schema';

export const isApiDeprecated = (api: APIDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.deactivationInfo.deprecationDate);
};

export const isApiDeactivated = (api: APIDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  return moment().isAfter(api.deactivationInfo.deactivationDate);
};

export const getDeprecatedFlags = (): { [apiId: string]: boolean } =>
  getAllApis().reduce((flags: { [apiId: string]: boolean }, api: APIDescription) => {
    flags[api.urlFragment] = isApiDeprecated(api);
    return flags;
  }, {});

export const getDeactivatedFlags = (): { [apiId: string]: boolean } =>
  getAllApis().reduce((flags: { [apiId: string]: boolean }, api: APIDescription) => {
    flags[api.urlFragment] = isApiDeactivated(api);
    return flags;
  }, {});

// returns a synthetic "category" of deactivated APIs
export const getDeactivatedCategory = (): BaseAPICategory => ({
  apis: getAllApis().filter((api: APIDescription) => isApiDeactivated(api)),
  name: 'Deactivated APIs',
  properName: 'Deactivated APIs',
});

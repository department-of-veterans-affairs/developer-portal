import moment from 'moment';
import { getAllApis } from './query';
import { APIDescription, BaseAPICategory } from './schema';

export const isApiDeprecated = (api: APIDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  const deprecatedFF = process.env[`REACT_APP_${api.urlFragment.toUpperCase()}_DEPRECATED`];

  if (deprecatedFF) {
    return true;
  }

  return moment().isAfter(moment(api.deactivationInfo.deprecationDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ'));
};

export const isApiDeactivated = (api: APIDescription): boolean => {
  if (api.deactivationInfo === undefined) {
    return false;
  }

  const deactivatedFF = process.env[`REACT_APP_${api.urlFragment.toUpperCase()}_DEACTIVATED`];

  if (deactivatedFF) {
    return true;
  }

  return moment().isAfter(moment(api.deactivationInfo.deactivationDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ'));
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

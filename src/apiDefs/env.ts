import { getAllApis, getApiCategoryOrder, getApiDefinitions } from "./query";
import { IApiDescription } from "./schema";

export function isHostedApiEnabled(apiIdentifier: string, defaultValue: boolean): boolean {
  const envValue = process.env[`REACT_APP_${apiIdentifier.toUpperCase()}_API_ENABLED`];
  if (envValue == null) {
    return defaultValue;
  } else {
    return envValue === 'true';
  }
}

export const getEnvFlags = () => {
  const allApis: IApiDescription[] = getAllApis();
  const envFlags = allApis.reduce((result: {[key: string]: boolean}, api: IApiDescription) => {
    result[api.urlFragment] = isHostedApiEnabled(api.urlFragment, api.enabledByDefault);
    return result;
  }, {});
  return envFlags;
};

export const getCategoryFlags = () => {
  const apiDefinitions = getApiDefinitions();
  const categories = {};
  getApiCategoryOrder().forEach((category) => {
    categories[category] = apiDefinitions[category].apis.some( api => isHostedApiEnabled(api.urlFragment, api.enabledByDefault) );
  });
  return categories;
};

export const getEnabledApiCategories = () => {
  const categoryFlags = getCategoryFlags();
  return getApiCategoryOrder().filter((category) => categoryFlags[category]);
};

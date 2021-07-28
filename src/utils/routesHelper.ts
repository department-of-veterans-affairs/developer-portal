import { APICategories, APICategory } from '../apiDefs/schema';

export const buildApiDetailRoutes = (apiDefinitions: APICategories): string[] =>
  Object.entries(apiDefinitions).flatMap(([key, value]: [string, APICategory]) => {
    const apiRoutes = [];
    apiRoutes.push(`/explore/${key}`);
    if (value.content.quickstart) {
      apiRoutes.push(`/explore/${key}/docs/quickstart`);
    }
    if (value.apis.length > 0) {
      value.apis.forEach(api => {
        // Not required but this outputs the urls to generate the sitemap
        apiRoutes.push(`/explore/${key}/docs/${api.urlFragment}`);
      });
      // This is needed to allow the api specific 404 page to show up
      apiRoutes.push(`/explore/${key}/docs/:apiName`);
    }

    return apiRoutes;
  });

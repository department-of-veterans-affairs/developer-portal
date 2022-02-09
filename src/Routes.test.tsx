import * as rootApiQuery from './apiDefs/getApiDefinitions';
import { sitemapConfig, SiteRoutes } from './Routes';
import { fakeCategories } from './__mocks__/fakeCategories';

describe('Routes.tsx', () => {
  beforeEach(() => {
    jest.spyOn(rootApiQuery, 'getApiDefinitions').mockReturnValue(fakeCategories);
  });
  it('sitemapConfig urls are accurate', () => {
    const config = sitemapConfig();
    expect(config).toEqual({
      paramsConfig: {},
      pathFilter: {
        isValid: false,
        rules: [
          /index.html|\/explore\/terms-of-service|\/applied|\/oauth/,
          /lotr\/docs\/:apiName/,
          /movies\/docs\/:apiName/,
          /sports\/docs\/:apiName/,
        ],
      },
      topLevelRoutes: SiteRoutes,
    });
  });
});

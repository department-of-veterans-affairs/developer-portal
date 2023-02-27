import { fakeCategories } from '../__mocks__/fakeCategories';
import { APICategories } from '../apiDefs/schema';
import { buildApiDetailRoutes } from './routesHelper';

describe('API category and definition routes', () => {
  it('Includes the expected list of routes for the /explore/* based on fakeCategories', () => {
    const categories: APICategories = fakeCategories;
    const expected: string[] = [
      '/explore/lotr',
      '/explore/lotr/docs/rings',
      '/explore/lotr/docs/silmarils',
      '/explore/lotr/docs/hobbits',
      '/explore/lotr/docs/:apiName',
      '/explore/movies',
      '/explore/movies/docs/quickstart',
      '/explore/movies/docs/apollo_13',
      '/explore/movies/docs/armageddon',
      '/explore/movies/docs/the_martian',
      '/explore/movies/docs/:apiName',
      '/explore/sports',
      '/explore/sports/docs/basketball',
      '/explore/sports/docs/baseball',
      '/explore/sports/docs/:apiName',
    ];
    const builtRoutes = buildApiDetailRoutes(categories);
    expect(builtRoutes).toEqual(expected);
  });

  it('Includes quickstart route when expected', () => {
    const categories: APICategories = {
      ...fakeCategories,
      lotr: {
        ...fakeCategories.lotr,
        content: {
          ...fakeCategories.lotr.content,
          // Add a quickstart
          quickstart: 'quickstart content here',
        },
      },
    };

    const expected: string[] = [
      '/explore/lotr',
      '/explore/lotr/docs/quickstart',
      '/explore/lotr/docs/rings',
      '/explore/lotr/docs/silmarils',
      '/explore/lotr/docs/hobbits',
      '/explore/lotr/docs/:apiName',
      '/explore/movies',
      '/explore/movies/docs/quickstart',
      '/explore/movies/docs/apollo_13',
      '/explore/movies/docs/armageddon',
      '/explore/movies/docs/the_martian',
      '/explore/movies/docs/:apiName',
      '/explore/sports',
      '/explore/sports/docs/basketball',
      '/explore/sports/docs/baseball',
      '/explore/sports/docs/:apiName',
    ];
    const builtRoutes = buildApiDetailRoutes(categories);
    expect(builtRoutes).toEqual(expected);
  });

  it('Excludes specific and wildcard API routes when expected', () => {
    const categories: APICategories = {
      ...fakeCategories,
      sports: {
        ...fakeCategories.sports,
        apis: [],
      },
    };

    const expected: string[] = [
      '/explore/lotr',
      '/explore/lotr/docs/rings',
      '/explore/lotr/docs/silmarils',
      '/explore/lotr/docs/hobbits',
      '/explore/lotr/docs/:apiName',
      '/explore/movies',
      '/explore/movies/docs/quickstart',
      '/explore/movies/docs/apollo_13',
      '/explore/movies/docs/armageddon',
      '/explore/movies/docs/the_martian',
      '/explore/movies/docs/:apiName',
      '/explore/sports',
    ];
    const builtRoutes = buildApiDetailRoutes(categories);
    expect(builtRoutes).toEqual(expected);
  });
});

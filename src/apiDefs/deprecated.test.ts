
import 'jest';
import * as moment from 'moment';
import { isApiDeprecated } from './deprecated';
import { IApiDescription } from './schema';

// let apiDefinitions = jest.genMockFromModule('./data/categories');
// jest.mock('./data/categories');
// import * as categories from './data/categories';

describe('deprecated API module', () => {
  describe('isApiDeprecated', () => {
    const apiValues: IApiDescription = {
      description: "it's a fabulous API, you really must try it sometime",
      docSources: [],
      name: 'My API',
      urlFragment: 'my_api',
      vaInternalOnly: false,
    };

    describe('with IApiDescription argument', () => {
      it('returns false if api.deprecated is undefined', () => {
        const api : IApiDescription = {
          ... apiValues,
        };
        expect(isApiDeprecated(api)).toBe(false);
      });

      it('returns false if api.deprecated is false', () => {
        const api : IApiDescription = {
          ... apiValues,
          deprecated: false,
        };
        expect(isApiDeprecated(api)).toBe(false);
      });

      it('returns true if api.deprecated is true', () => {
        const api : IApiDescription = {
          ... apiValues,
          deprecated: true,
        };
        expect(isApiDeprecated(api)).toBe(true);
      });

      it('returns false if api.deprecated is a Moment in the future', () => {
        const api : IApiDescription = {
          ... apiValues,
          deprecated: moment().add(1, 'months'),
        };
        expect(isApiDeprecated(api)).toBe(false);
      });

      it('returns true if api.deprecated is a Moment in the past', () => {
        const api : IApiDescription = {
          ... apiValues,
          deprecated: moment().subtract(1, 'months'),
        };
        expect(isApiDeprecated(api)).toBe(true);
      });
    });

//     describe('with string argument', () => {
//       it('returns false if it cannot find the API', () => {
//         apiDefinitions = 
//       });

//       it('returns false if api.deprecated is undefined', () => {

//       });

//       it('returns false if api.deprecated is false', () => {

//       });

//       it('returns true if api.deprecated is true', () => {

//       });

//       it('returns ', () => {

//       });
//     });
  });
});
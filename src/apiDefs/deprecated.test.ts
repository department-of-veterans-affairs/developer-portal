import 'jest';
import * as moment from 'moment';
import { IApiDescription } from './schema';

jest.mock('./query');
// tslint:disable-next-line:no-var-requires
const lookupApiByFragment = require('./query').lookupApiByFragment; 

import { isApiDeprecated } from './deprecated';

describe('deprecated API module', () => {
  describe('isApiDeprecated', () => {
    const apiValues: IApiDescription = {
      description: "it's a fabulous API, you really must try it sometime",
      docSources: [],
      enabledByDefault: true,
      name: 'My API',
      urlFragment: 'my_api',
      vaInternalOnly: false,
    };

    describe('with IApiDescription argument', () => {
      it('returns false if api.deprecated is undefined', () => {
        expect(isApiDeprecated(apiValues)).toBe(false);
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

    describe('with string argument', () => {
      afterEach(() => {
        lookupApiByFragment.mockReset();
      });

      it('returns false if it cannot find the API', () => {
        lookupApiByFragment.mockReturnValueOnce(null);
        expect(isApiDeprecated('my_api')).toBe(false);
      });

      it('returns false if api.deprecated is undefined', () => {
        lookupApiByFragment.mockReturnValueOnce(apiValues);
        expect(isApiDeprecated('my_api')).toBe(false);
      });

      it('returns false if api.deprecated is false', () => {
        const api: IApiDescription = {
          ... apiValues,
          deprecated: false,
        };
        lookupApiByFragment.mockReturnValueOnce(api);
        expect(isApiDeprecated('my_api')).toBe(false);
      });

      it('returns true if api.deprecated is true', () => {
        const api: IApiDescription = {
          ... apiValues,
          deprecated: true,
        };
        lookupApiByFragment.mockReturnValueOnce(api);
        expect(isApiDeprecated('my_api')).toBe(true);
      });

      it('returns false if api.deprecated is a moment in the future', () => {
        const api: IApiDescription = {
          ... apiValues,
          deprecated: moment().add(1, 'months'),
        };
        lookupApiByFragment.mockReturnValueOnce(api);
        expect(isApiDeprecated('my_api')).toBe(false);
      });

      it('returns true api.deprecated is a Moment in the past', () => {
        const api: IApiDescription = {
          ... apiValues,
          deprecated: moment().subtract(1, 'months'),
        };
        lookupApiByFragment.mockReturnValueOnce(api);
        expect(isApiDeprecated('my_api')).toBe(true);
      });
    });
  });
});
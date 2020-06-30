import 'jest';
import * as moment from 'moment';

// we just need a Markdown component for  our test IApiDescription
import { FhirApiReleaseNotes } from '../content/apiDocs/health';
import { isApiDeprecated, isApiRemoved } from './deprecated';
import { IApiDescription } from './schema';

describe('deprecated API module', () => {
  const apiValues: IApiDescription = {
    description: "it's a fabulous API, you really must try it sometime",
    docSources: [],
    enabledByDefault: true,
    name: 'My API',
    oAuth: false,
    releaseNotes: FhirApiReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'my_api',
    vaInternalOnly: false,
  };
  
  describe('isApiDeprecated', () => {
    it('returns false if removalInfo is undefined', () => {
      expect(isApiDeprecated(apiValues)).toBe(false);
    });

    it('returns false if the deprecation date is in the future', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().add(1, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().add(2, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(false);
    });

    it('returns true if the deprecation date is in the past', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().subtract(1, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().add(2, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });

    it('returns true if the API is removed', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().subtract(2, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });
  });

  describe('isApiRemoved', () => {
    it('returns false if removalInfo is undefined', () => {
      expect(isApiRemoved(apiValues)).toBe(false);
    });

    it('returns false if the API is not deprecated yet', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().add(1, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().add(2, 'month'),
        },
      };
      expect(isApiRemoved(api)).toBe(false);
    });

    it('returns false if the API is deprecated but the removal date is in the future', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().subtract(1, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().add(2, 'month'),
        },
      };
      expect(isApiRemoved(api)).toBe(false);
    });

    it('returns true if the removal date is in the past', () => {
      const api : IApiDescription = {
        ... apiValues,
        removalInfo: {
          deprecationContent: FhirApiReleaseNotes,
          deprecationDate: moment().subtract(2, 'month'),
          removalContent: FhirApiReleaseNotes,
          removalDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiRemoved(api)).toBe(true);
    });
  });
});
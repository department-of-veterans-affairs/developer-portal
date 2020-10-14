import 'jest';
import moment from 'moment';

// we just need a Markdown component for  our test IApiDescription
import { UrgentCareDeprecationNotice } from '../content/apiDocs/health';
import { isApiDeactivated, isApiDeprecated } from './deprecated';
import { APIDescription } from './schema';

describe('deprecated API module', () => {
  const apiValues: APIDescription = {
    description: "it's a fabulous API, you really must try it sometime",
    docSources: [],
    enabledByDefault: true,
    name: 'My API',
    oAuth: false,
    releaseNotes: UrgentCareDeprecationNotice,
    trustedPartnerOnly: false,
    urlFragment: 'my_api',
    vaInternalOnly: false,
  };

  describe('isApiDeprecated', () => {
    it('returns false if deactivationInfo is undefined', () => {
      expect(isApiDeprecated(apiValues)).toBe(false);
    });

    it('returns false if the deprecation date is in the future', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().add(2, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().add(1, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(false);
    });

    it('returns true if the deprecation date is in the past', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().add(2, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });

    it('returns true if the API is deactivated', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().subtract(1, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().subtract(2, 'month'),
        },
      };
      expect(isApiDeprecated(api)).toBe(true);
    });
  });

  describe('isApiDeactivated', () => {
    it('returns false if deactivationInfo is undefined', () => {
      expect(isApiDeactivated(apiValues)).toBe(false);
    });

    it('returns false if the API is not deprecated yet', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().add(2, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().add(1, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(false);
    });

    it('returns false if the API is deprecated but the deactivation date is in the future', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().add(2, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().subtract(1, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(false);
    });

    it('returns true if the removal date is in the past', () => {
      const api: APIDescription = {
        ...apiValues,
        deactivationInfo: {
          deactivationContent: UrgentCareDeprecationNotice,
          deactivationDate: moment().subtract(1, 'month'),
          deprecationContent: UrgentCareDeprecationNotice,
          deprecationDate: moment().subtract(2, 'month'),
        },
      };
      expect(isApiDeactivated(api)).toBe(true);
    });
  });
});

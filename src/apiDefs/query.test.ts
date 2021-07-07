/**
 * This file contains unit tests for the query.ts module in this directory. Because query.ts
 * is the only module that accesses data from the Typescript definition files in data/ directly,
 * we cannot currently mock the dependencies of these functions. Because query is a core module for
 * this application, however, it is better not to leave these functions untested. Therefore, this
 * test suite tests high-level results of these functions by querying our real data. When the source
 * of that data changes from Typescript objects to a database, we can mock the calls to the database
 * instead of checking real data.
 *
 * In the meantime, these tests are limited to checking properties of our APIs that should be relatively
 * stable over time, so that they will not break for the majority of pull requests to developer-portal.
 * If you make a significant change to one of the APIs, you may need to update these tests, but that
 * should be a rare occurrence. If you need to add tests to this file, please respect this convention
 * and avoid testing with data that is likely to change over time.
 */

/* eslint-disable max-nested-callbacks -- Jest callbacks */
import 'jest';
import { FacilitiesReleaseNotes } from '../content/apiDocs/facilities';
import {
  getAllQuickstartCategorySlugs,
  includesOAuthAPI,
  lookupApiByFragment,
  lookupApiCategory,
} from './query';

describe('query module', () => {
  describe('lookupApiByFragment', () => {
    it('finds the API if it is defined', () => {
      const api = lookupApiByFragment('facilities');
      expect(api).toEqual({
        altID: 'facilities',
        description: 'VA Facilities',
        docSources: [
          {
            openApiUrl: 'http://localhost:3000/internal/docs/facilities/v0/openapi.json',
          },
        ],
        enabledByDefault: true,
        name: 'VA Facilities API',
        releaseNotes: FacilitiesReleaseNotes,
        trustedPartnerOnly: false,
        urlFragment: 'facilities',
        vaInternalOnly: false,
        veteranRedirect: {
          linkText: "Find the facility that's right for you",
          linkUrl: 'https://www.va.gov/find-locations/',
          message: 'Are you a Veteran?',
        },
      });
    });

    it('returns null if the API does not exist', () => {
      expect(lookupApiByFragment('fake')).toBeNull();
    });
  });

  describe('lookupApiCategory', () => {
    /**
     * This test checks relatively stable properties of our API categories. If our API
     * categories change substantially in the future, this test will need to be updated.
     */
    it('returns the API category definition if it is defined', () => {
      const appealsApi = lookupApiCategory('appeals');
      expect(appealsApi).not.toBeNull();
      expect(appealsApi?.apis.length).toBeGreaterThanOrEqual(2);
      expect(appealsApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(0);

      const benefitsApi = lookupApiCategory('benefits');
      expect(benefitsApi).not.toBeNull();
      expect(benefitsApi?.apis.length).toBeGreaterThanOrEqual(3);
      expect(benefitsApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(1);

      const facilitiesApi = lookupApiCategory('facilities');
      expect(facilitiesApi).not.toBeNull();
      expect(facilitiesApi?.apis.length).toBeGreaterThanOrEqual(1);
      expect(facilitiesApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(0);

      const healthApi = lookupApiCategory('health');
      expect(healthApi).not.toBeNull();
      expect(healthApi?.apis.length).toBeGreaterThanOrEqual(4);
      expect(healthApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(4);

      const verificationApi = lookupApiCategory('verification');
      expect(verificationApi).not.toBeNull();
      expect(verificationApi?.apis.length).toBeGreaterThanOrEqual(3);
      expect(verificationApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(1);
    });

    it('returns null for an API that does not exist', () => {
      expect(lookupApiCategory('fake')).toBeNull();
    });
  });

  describe('includeOauthAPI', () => {
    it('returns true if the list includes an API within a key-based category', () => {
      expect(includesOAuthAPI(['benefits', 'facilities', 'fhir'])).toBe(true);
    });

    it('returns true if the list includes an API that is marked as OAuth at the API level', () => {
      expect(includesOAuthAPI(['benefits', 'claims', 'facilities'])).toBe(true);
    });

    it('returns false if the list does not include any OAuth APIs', () => {
      expect(includesOAuthAPI(['benefits', 'facilities'])).toBe(false);
    });
  });

  describe('getAllQuickstartCategorySlugs', () => {
    it('returns the list of all API category slugs that have a quickstart page', () => {
      expect(getAllQuickstartCategorySlugs()).toStrictEqual(['health']);
    });
  });
});

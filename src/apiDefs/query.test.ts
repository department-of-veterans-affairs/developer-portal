/*
  This file contains unit tests for the query.ts module in this directory. Because query.ts
  is the only module that accesses data from the Typescript definition files in data/ directly,
  we cannot currently mock the dependencies of these functions. Because query is a core module for
  this application, however, it is better not to leave these functions untested. Therefore, this 
  test suite tests high-level results of these functions by querying our real data. When the source
  of that data changes from Typescript objects to a database, we can mock the calls to the database
  instead of checking real data. 
  
  In the meantime, these tests are limited to checking properties of our APIs that should be relatively
  stable over time, so that they will not break for the majority of pull requests to developer-portal.
  If you make a significant change to one of the APIs, you may need to update these tests, but that 
  should be a rare occurrence. If you need to add tests to this file, please respect this convention
  and avoid testing with data that is likely to change over time.
*/

import 'jest';
import { 
  includesOauthAPI,
  lookupApiByFragment, 
  lookupApiCategory, 
} from './query';

describe('query module', () => {
  describe('lookupApiByFragment', () => {
    it('finds the API if it is defined', () => {
      const api = lookupApiByFragment('facilities');
      expect(api).toEqual({
        description: "VA Facilities",
        docSources: [
          {
            metadataUrl: 'http://localhost:3000/services/va_facilities/metadata',
            openApiUrl: 'http://localhost:3000/services/va_facilities/docs/v0/api',
          },
        ],
        enabledByDefault: true,
        name: 'VA Facilities API',
        urlFragment: 'facilities',
        vaInternalOnly: false,
      });
    });

    it('returns null if the API does not exist', () => {
      expect(lookupApiByFragment('fake')).toBeNull();
    });
  });

  describe('lookupApiCategory', () => {
    // This test checks relatively stable properties of our API categories. If our API
    // categories change substantially in the future, this test will need to be updated.
    it('returns the API category definition if it is defined', () => {
      const benefitsApi = lookupApiCategory('benefits');
      expect(benefitsApi).not.toBeNull();
      expect(benefitsApi!.apis.length).toBeGreaterThanOrEqual(4);
      expect(benefitsApi!.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(1);
      
      const facilitiesApi = lookupApiCategory('facilities');
      expect(facilitiesApi).not.toBeNull();
      expect(facilitiesApi!.apis.length).toBeGreaterThanOrEqual(1);
      expect(facilitiesApi!.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(0);
      
      const healthApi = lookupApiCategory('health');
      expect(healthApi).not.toBeNull();
      expect(healthApi!.apis.length).toBeGreaterThanOrEqual(4);
      expect(healthApi!.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(4);
      
      const verificationApi = lookupApiCategory('verification');
      expect(verificationApi).not.toBeNull();
      expect(verificationApi!.apis.length).toBeGreaterThanOrEqual(3);
      expect(verificationApi!.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(2);

    });

    it('returns null for an API that does not exist', () => {
      expect(lookupApiCategory('fake')).toBeNull();
    });
  });

  describe('includeOauthAPI', () => {
    it('returns true if the list includes an API within a key-based category', () => {
      expect(includesOauthAPI(['benefits', 'facilities', 'fhir'])).toBe(true);
    });
    
    it('returns true if the list includes an API that is marked as OAuth at the API level', () => {
      expect(includesOauthAPI(['benefits', 'claims', 'facilities'])).toBe(true);
    });

    it('returns false if the list does not include any OAuth APIs', () => {
      expect(includesOauthAPI(['benefits', 'facilities'])).toBe(false);
    });
  });
});
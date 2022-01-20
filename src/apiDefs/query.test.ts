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
import { ClaimsReleaseNotes } from '../content/apiDocs/benefits';
import {
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
} from '../content/apiDocs/verification';
import {
  apisFor,
  getAllQuickstartCategorySlugs,
  includesOAuthAPI,
  lookupApiByFragment,
  lookupApiCategory,
  includesInternalOnlyAPI,
  onlyOpenDataAPIs,
} from './query';
import { APIDescription, ProdAccessFormSteps } from './schema';

const facilities: APIDescription = {
  altID: 'facilities',
  description: 'VA Facilities',
  docSources: [
    {
      metadataUrl: 'http://localhost:3000/internal/docs/facilities/metadata.json',
      openApiUrl: 'http://localhost:3000/internal/docs/facilities/v0/openapi.json',
    },
  ],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Two,
  name: 'VA Facilities API',
  openData: true,
  releaseNotes: FacilitiesReleaseNotes,
  urlFragment: 'facilities',
  vaInternalOnly: false,
  veteranRedirect: {
    linkText: "Find the facility that's right for you",
    linkUrl: 'https://www.va.gov/find-locations/',
    message: 'Are you a Veteran?',
  },
};

const claims: APIDescription = {
  altID: 'claims',
  description: 'Submit and track claims',
  docSources: [
    {
      metadataUrl: 'http://localhost:3000/internal/docs/benefits-claims/metadata.json',
      openApiUrl: 'http://localhost:3000/internal/docs/benefits-claims/v0/openapi.json',
    },
  ],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Benefits Claims API',
  oAuth: true,
  oAuthInfo: {
    acgInfo: {
      baseAuthPath: '/oauth2/claims/v1',
      scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    },
    ccgInfo: {
      baseAuthPath: '/oauth2/claims/system/v1',
      productionAud: 'ausajojxqhTsDSVlA297',
      sandboxAud: 'ausdg7guis2TYDlFe2p7',
      scopes: ['claim.read', 'claim.write'],
    },
  },
  oAuthTypes: ['AuthorizationCodeGrant', 'ClientCredentialsGrant'],
  openData: false,
  releaseNotes: ClaimsReleaseNotes,
  urlFragment: 'claims',
  vaInternalOnly: false,
  veteranRedirect: {
    linkText: 'benefits or appeals claim status',
    linkUrl: 'https://www.va.gov/claim-or-appeal-status/',
    message: 'Are you a Veteran or a Veteran representative? Check your',
  },
};

const confirmation: APIDescription = {
  // adding an altID to match keys need on the backend for signup
  altID: 'confirmation',
  description: 'Confirm Veteran status for a given person with an API key.',
  docSources: [
    {
      metadataUrl: 'http://localhost:3000/internal/docs/veteran-confirmation/metadata.json',
      openApiUrl: 'http://localhost:3000/internal/docs/veteran-confirmation/v0/openapi.json',
    },
  ],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Veteran Confirmation API',
  openData: false,
  releaseNotes: VeteranConfirmationReleaseNotes,
  urlFragment: 'veteran_confirmation',
  vaInternalOnly: false,
};

const verification: APIDescription = {
  altID: 'verification',
  description:
    'Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.',
  docSources: [
    {
      metadataUrl: 'http://localhost:3000/internal/docs/veteran-verification/metadata.json',
      openApiUrl: 'http://localhost:3000/internal/docs/veteran-verification/v0/openapi.json',
    },
  ],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Veteran Verification API',
  oAuth: true,
  oAuthInfo: {
    acgInfo: {
      baseAuthPath: '/oauth2/veteran-verification/v1',
      scopes: [
        'profile',
        'openid',
        'offline_access',
        'service_history.read',
        'disability_rating.read',
        'veteran_status.read',
      ],
    },
  },
  oAuthTypes: ['AuthorizationCodeGrant'],
  openData: false,
  releaseNotes: VeteranVerificationReleaseNotes,
  urlFragment: 'veteran_verification',
  vaInternalOnly: false,
};

describe('query module', () => {
  describe('lookupApiByFragment', () => {
    it('finds the API if it is defined', () => {
      const api = lookupApiByFragment('facilities');
      expect(api).toEqual(facilities);
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
      expect(healthApi?.apis.map(api => !!api.oAuth).filter(m => m).length).toEqual(6);

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
      expect(includesOAuthAPI(['benefits', 'facilities', 'health'])).toBe(true);
    });

    it('returns true if the list includes an API that is marked as OAuth at the API level', () => {
      expect(includesOAuthAPI(['benefits', 'claims', 'facilities'])).toBe(true);
    });

    it('returns false if the list does not include any OAuth APIs', () => {
      expect(includesOAuthAPI(['benefits', 'facilities'])).toBe(false);
    });
  });

  describe('includesInternalOnlyAPI', () => {
    it('returns true if the list includes an API within a key-based category', () => {
      expect(includesInternalOnlyAPI(['appeals', 'decision_reviews', 'loan_guaranty'])).toBe(true);
    });

    it('returns false if the list does not include any VA Internal Only APIs', () => {
      expect(includesInternalOnlyAPI(['benefits', 'facilities', 'vaForms'])).toBe(false);
    });
  });

  describe('onlyOpenDataApis', () => {
    it('returns true if the list includes only Open Data APIs', () => {
      expect(onlyOpenDataAPIs(['vaForms', 'facilities'])).toBe(true);
    });

    it('returns false if the list does not include any VA Internal Only APIs', () => {
      expect(onlyOpenDataAPIs(['benefits', 'facilities', 'vaForms'])).toBe(false);
    });
  });

  describe('getAllQuickstartCategorySlugs', () => {
    it('returns the list of all API category slugs that have a quickstart page', () => {
      expect(getAllQuickstartCategorySlugs()).toStrictEqual(['health']);
    });
  });

  describe('apisFor', () => {
    it('retrieves the requested APIs', () => {
      const apis = apisFor(['facilities', 'claims']);
      expect(apis).toHaveLength(2);
      expect(apis).toContainEqual(facilities);
      expect(apis).toContainEqual(claims);
    });

    it('checks both urlFragment and altID', () => {
      // 'verification' is an altID, 'veteran_confirmation' is a urlFragment
      const apis = apisFor(['verification', 'veteran_confirmation']);
      expect(apis).toHaveLength(2);
      expect(apis).toContainEqual(confirmation);
      expect(apis).toContainEqual(verification);
    });
  });
});

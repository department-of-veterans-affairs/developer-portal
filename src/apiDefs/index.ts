import {
  // appealsContent, //TODO uncomment
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
} from '../content/apiDocs';

import {
  // AppealsReleaseNotes, //TODO uncomment
  BenefitsReleaseNotes,
  FacilitiesReleaseNotes,
  HealthReleaseNotes,
  VerificationReleaseNotes,
} from '../content/releaseNotes';

import {
  IApiCategories,
  IApiCategory,
  IApiCategoryContent,
  IApiDescription,
  IApiDocSource,
} from './schema';

// import appealsApis from './appeals'; //TODO uncomment
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import verificationApis from './verification';

export { 
  IApiCategories,
  IApiCategory,
  IApiCategoryContent,
  IApiDescription,
  IApiDocSource,
};

export const apiDefs: IApiCategories = {
  // appeals: {
  //   apiKey: true,
  //   apis: appealsApis,
  //   buttonText: 'Get Your Key',
  //   content: appealsContent,
  //   name: 'Appeals API',
  //   properName: 'Appeals API',
  //   releaseNotes: AppealsReleaseNotes,
  //   shortDescription:
  //     'Enables managing benefit decision appeals on behalf of a Veteran.',
  // }, //TODO uncomment
  benefits: {
    apiKey: true,
    apis: benefitsApis,
    buttonText: 'Get Your Key',
    content: benefitsContent,
    name: 'Benefits API',
    properName: 'Benefits Intake API',
    releaseNotes: BenefitsReleaseNotes,
    shortDescription:
      'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  },
  facilities: {
    apiKey: true,
    apis: facilitiesApis,
    buttonText: 'Get Your Key',
    content: facilitiesContent,
    name: 'Facilities API',
    properName: 'VA Facilities API',
    releaseNotes: FacilitiesReleaseNotes,
    shortDescription:
      'Use the VA Facility API to find relevant information about a specific VA facility.',
  },
  health: {
    apiKey: false,
    apis: healthApis,
    buttonText: 'Get Your Key',
    content: healthContent,
    name: 'Health API',
    properName: 'Health API',
    releaseNotes: HealthReleaseNotes,
    shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
    tabBlurb: "The VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
  },
  verification: {
    apiKey: false,
    apis: verificationApis,
    buttonText: 'Stay Informed',
    content: verificationContent,
    name: 'Veteran Verification API',
    properName: 'Veteran Verification API',
    releaseNotes: VerificationReleaseNotes,
    shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
  },
};

export const apiCategoryOrder: string[] = ['benefits', 'facilities', 'health', 'verification'];

// If an API with the given URL fragment exists, the given `fn` callback
// function will be called with the full IApiDescription. The return value is
// either the return value of the callback function or `null` if no such API
// exists.
export function withApiDescription(
  urlFragment: string,
  fn: (apiDesc: IApiDescription) => any,
): any {
  const api = lookupApiByFragment(urlFragment);
  if (api == null) {
    return null;
  }

  return fn(api);
}

export function lookupApiByFragment(urlFragment: string): IApiDescription | null {
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (api.urlFragment === urlFragment) {
        return api;
      }
    }
  }

  return null;
}

export function lookupApiCategory(categoryKey: string): IApiCategory | null {
  return apiDefs[categoryKey];
}

function categoriesFor(apiList: string[]): IApiCategory[] {
  const categories = new Set();
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (apiList.includes(api.urlFragment)) {
        categories.add(cat);
      }
    }
  }
  return Array.from(categories);
}

function apisFor(apiList: string[]): IApiDescription[] {
  const apis = new Set();
  for (const cat of Object.values(apiDefs)) {
    for (const api of cat.apis) {
      if (apiList.includes(api.urlFragment)) {
        apis.add(api);
      }
    }
  }
  return Array.from(apis);
}

export function includesOauthAPI(apiList: string[]): boolean {
  return categoriesFor(apiList).some(category => !category.apiKey)|| apisFor(apiList).some(api => api.oAuth || false);
}

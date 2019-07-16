import {
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
} from '../content/apiDocs';

import {
  BenefitsReleaseNotes,
  FacilitiesReleaseNotes,
  HealthReleaseNotes,
  VerificationReleaseNotes,
} from '../content/releaseNotes';

import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import verificationApis from './verification';

export interface IApiCategoryContent {
  readonly intro: React.StatelessComponent;
  readonly overview: React.StatelessComponent;
}

export interface IApiDocSource {
  readonly metadataUrl?: string;
  readonly openApiUrl: string;
  readonly key?: string;
  readonly label?: string;
  readonly apiIntro?: React.StatelessComponent;
}

export interface IApiDescription {
  readonly name: string;
  readonly docSources: IApiDocSource[];
  readonly urlFragment: string;
  readonly description: string;
  readonly vaInternalOnly: boolean;
  readonly deprecationContent?: React.StatelessComponent;
}
export interface IApiCategory {
  readonly apiKey: boolean;
  readonly apis: IApiDescription[];
  readonly properName: string;
  readonly buttonText: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly releaseNotes?: React.StatelessComponent;
  readonly showProperNameAboveTitle?: boolean,
  readonly tabBlurb?: string;
  readonly content: IApiCategoryContent;
}

export interface IApiCategories {
  [key: string]: IApiCategory;
}

export const apiDefs: IApiCategories = {
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
    showProperNameAboveTitle: true,
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

export function includesOauthAPI(apiList: string[]): boolean {
  return categoriesFor(apiList).some(category => !category.apiKey);
}

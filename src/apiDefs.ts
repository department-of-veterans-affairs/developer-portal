import {
  BenefitsOverview,
  FacilitiesOverview,
  HealthOverview,
  VerificationOverview,
} from './content/apiDocs';

import {
  BenefitsReleaseNotes,
  FacilitiesReleaseNotes,
  HealthReleaseNotes,
  VerificationReleaseNotes,
} from './content/releaseNotes';

export interface IApiDocSource {
  readonly metadataUrl?: string;
  readonly openApiUrl: string;
  readonly key?: string;
  readonly label?: string;
}

export interface IApiDescription {
  readonly name: string;
  readonly docSources: IApiDocSource[];
  readonly urlFragment: string;
  readonly shortDescription: string;
  readonly vaInternalOnly: boolean;
}

export interface IApiCategory {
  readonly apiKey: boolean;
  readonly apis: IApiDescription[];
  readonly properName: string;
  readonly buttonText: string;
  readonly name: string;
  readonly overview: React.StatelessComponent;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly releaseNotes?: React.StatelessComponent;
}

export interface IApiCategories {
  [key: string]: IApiCategory;
}

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const getLegacyHealthApiName = () => {
  if (process.env.REACT_APP_FHIR_API_ENABLED === 'true') {
    return 'Legacy Veterans Health API';
  }
  return 'Veterans Health API';
}

export const apiDefs: IApiCategories = {
  benefits: {
    apiKey: true,
    apis: [
      {
        docSources: [
          {
            metadataUrl: `${swaggerHost}/services/vba_documents/metadata`,
            openApiUrl: `${swaggerHost}/services/vba_documents/docs/v0/api`,
          },
        ],
        name: 'Benefits Intake',
        shortDescription: 'Submit PDF claims',
        urlFragment: 'benefits',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/appeals/docs/v0/api`,
          },
        ],
        name: 'Appeals Status',
        shortDescription: 'Track appeals',
        urlFragment: 'appeals',
        vaInternalOnly: true,
      },
      {
        docSources: [
          {
            metadataUrl: `${swaggerHost}/services/claims/metadata`,
            openApiUrl: `${swaggerHost}/services/claims/docs/v0/api`,
          },
        ],
        name: 'Benefits Claims',
        shortDescription: 'Submit and track claims',
        urlFragment: 'claims',
        vaInternalOnly: true,
      },
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/loan_guaranty/docs/v1/api`,
          },
        ],
        name: 'Loan Guaranty',
        shortDescription: 'Manage VA Home Loans',
        urlFragment: 'loan_guaranty',
        vaInternalOnly: false,
      },
    ],
    buttonText: 'Get Your Key',
    longDescription:
      'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
    name: 'Benefits',
    overview: BenefitsOverview,
    properName: 'Benefits Intake API',
    releaseNotes: BenefitsReleaseNotes,
    shortDescription:
      'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  },
  facilities: {
    apiKey: true,
    apis: [
      {
        docSources: [
          {
            metadataUrl: `${swaggerHost}/services/va_facilities/metadata`,
            openApiUrl: `${swaggerHost}/services/va_facilities/docs/v0/api`,
          },
        ],
        name: 'VA Facilities API',
        shortDescription: "VA Facilities",
        urlFragment: 'facilities',
        vaInternalOnly: false,
      },
    ],
    buttonText: 'Get Your Key',
    longDescription:
      "Use the VA Facility API to find relevant information about a specific VA facility. For each VA facility, you'll find contact information, location, hours of operation and available services. For medical facilities only, we provide data on appointment wait times and patient satisfaction.",
    name: 'Facilities',
    overview: FacilitiesOverview,
    properName: 'VA Facilities API',
    releaseNotes: FacilitiesReleaseNotes,
    shortDescription:
      'Use the VA Facility API to find relevant information about a specific VA facility.',
  },
  health: {
    apiKey: false,
    apis: [
      {
        docSources: [
          {
            key: 'argonaut',
            label: 'Argonaut',
            openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/argonaut/data-query/openapi.json',
          },
          {
            key: 'r4',
            label: 'R4',
            openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/r4/openapi.json',
          },
          {
            key: 'dstu2',
            label: 'DSTU2',
            openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/dstu2/openapi.json',
          },
        ],
        name: 'Veterans Health API',
        shortDescription: "VA's Argonaut resources",
        urlFragment: 'fhir',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: 'https://api.va.gov/services/argonaut/v0/openapi.json',
          },
        ],
        name: getLegacyHealthApiName(),
        shortDescription: "VA's Argonaut resources",
        urlFragment: 'argonaut',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: '',
          },
        ],
        name: 'Community Care Eligibility API',
        shortDescription: '',
        urlFragment: 'community_care',
        vaInternalOnly: false,
      },
    ],
    buttonText: 'Get Your Key',
    longDescription:
      'Use our APIs to build tools that help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and share their information with caregivers and providers.',
    name: 'Health',
    overview: HealthOverview,
    properName: 'Health API',
    releaseNotes: HealthReleaseNotes,
    shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
  },
  verification: {
    apiKey: false,
    apis: [
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/disability_rating`,
          },
        ],
        name: 'Disability Rating',
        shortDescription: "Get a Veteran's disability rating",
        urlFragment: 'disability_rating',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/service_history`,
          },
        ],
        name: 'Service History',
        shortDescription: "Get a Veteran's service history",
        urlFragment: 'service_history',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/status`,
          },
        ],
        name: 'Veteran Confirmation',
        shortDescription: "Get confirmation of a Veteran's status",
        urlFragment: 'veteran_confirmation',
        vaInternalOnly: false,
      },
      {
        docSources: [
          {
            openApiUrl: `${swaggerHost}/services/address_validation/docs/v1/api`,
          },
        ],
        name: 'Address Validation',
        shortDescription: 'Provides methods to standardize and validate addresses.',
        urlFragment: 'address_validation',
        vaInternalOnly: true,
      },
    ],
    buttonText: 'Stay Informed',
    longDescription: 'Empowering Veterans to take control of their data and put it to work.',
    name: 'Veteran Verification',
    overview: VerificationOverview,
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

import { BenefitsOverview,
         FacilitiesOverview,
         HealthOverview,
         VerificationOverview } from './content/apiDocs';

import { BenefitsReleaseNotes, 
         FacilitiesReleaseNotes, 
         HealthReleaseNotes, 
         VerificationReleaseNotes } from './content/releaseNotes';

export interface IApiDescription {
  readonly name: string;
  readonly openApiDocUrl: string;
  readonly urlFragment: string;
  readonly shortDescription: string;
  readonly vaInternalOnly: boolean;
}

export interface IApiDescriptions {
  [key: string]: IApiDescription;
}

export interface IApiCategory {
  readonly apiKey: boolean;
  readonly apis: IApiDescriptions;
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

// tslint:disable:object-literal-sort-keys
export const apiDefs : IApiCategories = {
  benefits: {
    apiKey: true,
    apis: {
      benefits: {
        name: 'Benefits Intake',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/vba_documents/docs/v0/api`,
        shortDescription: 'Submit PDF claims',
        urlFragment: 'benefits',
        vaInternalOnly: false,
      },
      appeals: {
        name: 'Appeals Status',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/appeals/docs/v0/api`,
        shortDescription: 'Track appeals',
        urlFragment: 'appeals',
        vaInternalOnly: true,
      },
      claims: {
        name: 'Benefits Claims',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/claims/docs/v0/api`,
        shortDescription: 'Submit and track claims',
        urlFragment: 'claims',
        vaInternalOnly: true,
      },
      loanGuaranty: {
        name: 'Loan Guaranty',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/loan_guaranty/docs/v1/api`,
        shortDescription: 'Manage VA Home Loans',
        urlFragment: 'loan_guaranty',
        vaInternalOnly: false,
      },
    },
    buttonText: "Get Your Key",
    longDescription: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
    name: 'Benefits',
    overview: BenefitsOverview,
    properName: 'Benefits Intake API',
    releaseNotes: BenefitsReleaseNotes,
    shortDescription: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  },
  facilities: {
    apiKey: true,
    apis: {
      facilities: {
        name: 'VA Facilities API',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/va_facilities/docs/v0/api`,
        shortDescription: "VA Facilities",
        urlFragment: 'facilities',
        vaInternalOnly: false,
      },
    },
    buttonText: "Get Your Key",
    longDescription: "Use the VA Facility API to find relevant information about a specific VA facility. For each VA facility, you'll find contact information, location, hours of operation and available services. For medical facilities only, we provide data on appointment wait times and patient satisfaction.",
    name: 'Facilities',
    overview: FacilitiesOverview,
    properName: 'VA Facilities API',
    releaseNotes: FacilitiesReleaseNotes,
    shortDescription: 'Use the VA Facility API to find relevant information about a specific VA facility.',
  },
  health: {
    apiKey: false,
    apis: {
      argonaut: {
        name: 'Veterans Health API',
        openApiDocUrl: "https://staging-api.va.gov/services/argonaut/v0/openapi.json",
        shortDescription: "VA's Argonaut resources",
        urlFragment: 'argonaut',
        vaInternalOnly: false,
      },
      communityCare: {
        name: 'Community Care Eligibility API',
        openApiDocUrl: "",
        shortDescription: "",
        urlFragment: 'community_care',
        vaInternalOnly: false,
      },
    },
    buttonText: "Get Your Key",
    longDescription: "Use our APIs to build tools that help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and share their information with caregivers and providers.",
    name: 'Health',
    overview: HealthOverview,
    properName: 'Health API',
    releaseNotes: HealthReleaseNotes,
    shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
  },
  verification: {
    apiKey: false,
    apis: {
      disabilityRating: {
        name: 'Disability Rating',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/veteran_verification/docs/v0/disability_rating`,
        shortDescription: "Get a Veteran's disability rating",
        urlFragment: 'disability_rating',
        vaInternalOnly: false,
      },
      serviceHistory: {
        name: 'Service History',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/veteran_verification/docs/v0/service_history`,
        shortDescription: "Get a Veteran's service history",
        urlFragment: 'service_history',
        vaInternalOnly: false,
      },
      veteranConfirmation: {
        name: 'Veteran Confirmation',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/veteran_verification/docs/v0/status`,
        shortDescription: "Get confirmation of a Veteran's status",
        urlFragment: 'veteran_confirmation',
        vaInternalOnly: false,
      },
      addressValidation: {
        name: 'Address Validation',
        openApiDocUrl: `${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/address_validation/docs/v1/api`,
        shortDescription: 'Provides methods to standardize and validate addresses.',
        urlFragment: 'address_validation',
        vaInternalOnly: true,
      },
    },
    buttonText: "Stay Informed",
    longDescription: 'Empowering Veterans to take control of their data and put it to work.',
    name: "Veteran Verification",
    overview: VerificationOverview,
    properName: 'Veteran Verification API',
    releaseNotes: VerificationReleaseNotes,
    shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
  },
};
// tslint:enable:object-literal-sort-keys

export const apiCategoryOrder: string[] = [
  'benefits',
  'facilities',
  'health',
  'verification',
];

// If an API with the given URL fragment exists, the given `fn` callback
// function will be called with the full IApiDescription. The return value is
// either the return value of the callback function or `null` if no such API
// exists.
export function withApiDescription(urlFragment: string, fn: (apiDesc: IApiDescription) => any): any {
  const api = lookupApiByFragment(urlFragment);
  if (api == null) {
    return null;
  }

  return fn(api);
}

export function lookupApiByFragment(urlFragment: string): IApiDescription | null {
  for (const cat of Object.values(apiDefs)) {
    for (const api of Object.values(cat.apis)) {
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

export function isOauthApi(apiName: string): boolean {
  for (const cat of Object.values(apiDefs)) {
    for (const name of Object.keys(cat.apis)) {
      if (name === apiName) {
        return !cat.apiKey;
      }
    }
  }
  return false;
}

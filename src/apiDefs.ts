import { BenefitsOverview,
         FacilitiesOverview,
         HealthOverview,
         VerificationOverview } from './content/apiDocs';

export interface IApiDescription {
  readonly name: string;
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
}

export interface IApiCategories {
  [key: string]: IApiCategory;
}

export const apiDefs : IApiCategories = {
  benefits: {
    apiKey: true,
    apis: [
      {
        name: 'Benefits Intake',
        shortDescription: 'Submit PDF claims',
        urlFragment: 'benefits',
        vaInternalOnly: false,
      },
      {
        name: 'Appeals Status',
        shortDescription: 'Track appeals',
        urlFragment: 'appeals',
        vaInternalOnly: false,
      },
      {
        name: 'Benefits Claims',
        shortDescription: 'Submit and track claims',
        urlFragment: 'claims',
        vaInternalOnly: false,
      },
      {
        name: 'Loan Guaranty',
        shortDescription: 'Manage VA Home Loans',
        urlFragment: 'loan_guaranty',
        vaInternalOnly: false,
      },
    ],
    buttonText: "Get Your Key",
    name: 'Benefits',
    overview: BenefitsOverview,
    properName: 'Benefits Intake API',
    shortDescription: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  },
  facilities: {
    apiKey: true,
    apis: [
      {
        name: 'VA Facilities API',
        shortDescription: "VA Facilities",
        urlFragment: 'facilities',
        vaInternalOnly: false,
      },
    ],
    buttonText: "Get Your Key",
    name: 'Facilities',
    overview: FacilitiesOverview,
    properName: 'VA Facilities API',
    shortDescription: "Use the VA Facility API to find relevant information about a specific VA facility. For each VA facility, you'll find contact information, location, hours of operation and available services. For medical facilities only, we provide data on appointment wait times and patient satisfaction.",
  },
  health: {
    apiKey: false,
    apis: [
      {
        name: 'Veterans Health API',
        shortDescription: "VA's Argonaut resources",
        urlFragment: 'argonaut',
        vaInternalOnly: false,
      },
    ],
    buttonText: "Get Your Key",
    name: 'Health',
    overview: HealthOverview,
    properName: 'Health API',
    shortDescription: "Use our APIs to build tools that help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and share their information with caregivers and providers.",
  },
  verification: {
    apiKey: false,
    apis: [
      {
        name: 'Disability Rating',
        shortDescription: "Get a Veteran's disability rating",
        urlFragment: 'disability_rating',
        vaInternalOnly: false,
      },
      {
        name: 'Service History',
        shortDescription: "Get a Veteran's service history",
        urlFragment: 'service_history',
        vaInternalOnly: false,
      },
      {
        name: 'Veteran Confirmation',
        shortDescription: "Get confirmation of a Veteran's status",
        urlFragment: 'veteran_confirmation',
        vaInternalOnly: false,
      },
      {
        name: 'Address Validation',
        shortDescription: 'Provides methods to standardize and validate addresses.',
        urlFragment: 'address_validation',
        vaInternalOnly: true,
      },
    ],
    buttonText: "Stay Informed",
    name: "Veteran Verification",
    overview: VerificationOverview,
    properName: 'Veteran Verification API',
    shortDescription: "Empowering Veterans to take control of their data and put it to work.",
  },
};

export const apiCategoryOrder: string[] = [
  'benefits',
  'facilities',
  'health',
  'verification',
];

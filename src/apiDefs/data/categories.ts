import {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
} from '../../content/apiDocs';

import {
  AppealsReleaseNotes,
  BenefitsReleaseNotes,
  FacilitiesReleaseNotes,
  HealthReleaseNotes,
  VerificationReleaseNotes,
} from '../../content/releaseNotes';

import { isHostedApiEnabled } from '../env';
import { IApiCategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import verificationApis from './verification';

const apiDefinitions : IApiCategories = {
  appeals: {
    apiKey: true,
    apis: appealsApis,
    buttonText: 'Get Your Key',
    content: appealsContent,
    name: 'Appeals API',
    properName: 'Appeals API',
    releaseNotes: AppealsReleaseNotes,
    shortDescription:
      'Enables managing benefit decision appeals on behalf of a Veteran.',
  },
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

let rawApiCategoryOrder = ['appeals', 'benefits', 'facilities', 'health', 'verification'];
// export the order, but remove any APIs that don't have any enabled apis
export const apiCategoryOrder: string[] = rawApiCategoryOrder.filter( apiName => apiDefinitions[apiName].apis.filter( api => isHostedApiEnabled(api.urlFragment, api.enabledByDefault) ).length > 0);
export default apiDefinitions;

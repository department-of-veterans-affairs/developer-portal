import {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
} from '../../content/apiDocs';

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
    placardText: 'Build tools to help Veterans electronically manage, submit, and track appeals.',
    properName: 'Appeals API',
    shortDescription:
      'Enables managing benefit decision appeals on behalf of a Veteran.',
  },
  benefits: {
    apiKey: true,
    apis: benefitsApis,
    buttonText: 'Get Your Key',
    content: benefitsContent,
    name: 'Benefits API',
    placardText: 'Build tools to help Veterans electronically manage, submit, track, and receive notifications on their claims.',
    properName: 'Benefits Intake API',
    shortDescription:
      'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  },
  facilities: {
    apiKey: true,
    apis: facilitiesApis,
    buttonText: 'Get Your Key',
    content: facilitiesContent,
    name: 'Facilities API',
    placardText: 'Get information on VA facilities including contact information, location, hours of operation, available services, appointment wait times, and patient satisfaction.',
    properName: 'VA Facilities API',
    shortDescription:
      'Use the VA Facility API to find relevant information about a specific VA facility.',
  },
  health: {
    apiKey: false,
    apis: healthApis,
    buttonText: 'Get Your Key',
    content: healthContent,
    name: 'Health API',
    placardText: 'Build tools to help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and securely share their information with caregivers and providers.',
    properName: 'Health API',
    shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
    tabBlurb: "The VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
  },
  verification: {
    apiKey: false,
    apis: verificationApis,
    buttonText: 'Stay Informed',
    content: verificationContent,
    name: 'Veteran Verification API',
    placardText: 'Build tools to help Veterans verify their Veteran status electronically on job sites, e-commerce sites, and third-party benefit sites.',
    properName: 'Veteran Verification API',
    shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
  },
};

const rawApiCategoryOrder = ['appeals', 'benefits', 'facilities', 'health', 'verification'];
// export the order, but remove any APIs that don't have any enabled apis
export const apiCategoryOrder: string[] = rawApiCategoryOrder.filter( apiName => apiDefinitions[apiName].apis.filter( api => isHostedApiEnabled(api.urlFragment, api.enabledByDefault) ).length > 0);
export default apiDefinitions;

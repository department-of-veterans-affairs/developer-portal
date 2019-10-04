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
    properName: 'Appeals API',
  },
  benefits: {
    apiKey: true,
    apis: benefitsApis,
    buttonText: 'Get Your Key',
    content: benefitsContent,
    name: 'Benefits API',
    properName: 'Benefits Intake API',
  },
  facilities: {
    apiKey: true,
    apis: facilitiesApis,
    buttonText: 'Get Your Key',
    content: facilitiesContent,
    name: 'Facilities API',
    properName: 'VA Facilities API',
  },
  health: {
    apiKey: false,
    apis: healthApis,
    buttonText: 'Get Your Key',
    content: healthContent,
    name: 'Health API',
    properName: 'Health API',
    tabBlurb: "The VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
  },
  verification: {
    apiKey: false,
    apis: verificationApis,
    buttonText: 'Stay Informed',
    content: verificationContent,
    name: 'Veteran Verification API',
    properName: 'Veteran Verification API',
  },
};

const rawApiCategoryOrder = ['appeals', 'benefits', 'facilities', 'health', 'verification'];
// export the order, but remove any APIs that don't have any enabled apis
export const apiCategoryOrder: string[] = rawApiCategoryOrder.filter( apiName => apiDefinitions[apiName].apis.filter( api => isHostedApiEnabled(api.urlFragment, api.enabledByDefault) ).length > 0);
export default apiDefinitions;

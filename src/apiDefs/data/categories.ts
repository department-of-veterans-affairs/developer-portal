import {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  vaFormsContent,
  verificationContent,
} from '../../content/apiDocs';

import { IApiCategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import vaForms from './vaForms';
import verificationApis from './verification';

const apiDefinitions: IApiCategories = {
  appeals: {
    apis: appealsApis,
    buttonText: 'Get Your Key',
    content: appealsContent,
    name: 'Appeals API',
    properName: 'Appeals API',
  },
  benefits: {
    apis: benefitsApis,
    buttonText: 'Get Your Key',
    content: benefitsContent,
    name: 'Benefits API',
    properName: 'Benefits Intake API',
  },
  facilities: {
    apis: facilitiesApis,
    buttonText: 'Get Your Key',
    content: facilitiesContent,
    name: 'Facilities API',
    properName: 'VA Facilities API',
  },
  health: {
    apis: healthApis,
    buttonText: 'Get Your Key',
    content: healthContent,
    name: 'Health API',
    properName: 'Health API',
    tabBlurb:
      "The VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
  },
  vaForms: {
    apis: vaForms,
    buttonText: 'Stay Informed',
    content: vaFormsContent,
    name: 'Forms API',
    properName: 'VA Form API',
  },
  verification: {
    apis: verificationApis,
    buttonText: 'Stay Informed',
    content: verificationContent,
    name: 'Veteran Verification API',
    properName: 'Veteran Verification API',
  },
};

export const apiCategoryOrder: string[] = [
  'appeals',
  'benefits',
  'facilities',
  'vaForms',
  'health',
  'verification',
];
export default apiDefinitions;

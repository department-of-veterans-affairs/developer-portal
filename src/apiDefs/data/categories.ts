import { appealsContent } from '../../content/apiDocs/appeals';
import { benefitsContent } from '../../content/apiDocs/benefits';
import { facilitiesContent } from '../../content/apiDocs/facilities';
import { healthContent } from '../../content/apiDocs/health';
import { vaFormsContent } from '../../content/apiDocs/vaForms';
import { verificationContent } from '../../content/apiDocs/verification';

import { APICategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import vaForms from './vaForms';
import verificationApis from './verification';

const apiDefinitions: APICategories = {
  appeals: {
    apis: appealsApis,
    content: appealsContent,
    name: 'Appeals API',
    properName: 'Appeals API',
  },
  benefits: {
    apis: benefitsApis,
    content: benefitsContent,
    name: 'Benefits API',
    properName: 'Benefits Intake API',
  },
  facilities: {
    apis: facilitiesApis,
    content: facilitiesContent,
    name: 'Facilities API',
    properName: 'VA Facilities API',
  },
  health: {
    apis: healthApis,
    content: healthContent,
    name: 'Health API',
    properName: 'Health API',
  },
  vaForms: {
    apis: vaForms,
    content: vaFormsContent,
    name: 'Forms API',
    properName: 'VA Form API',
  },
  verification: {
    apis: verificationApis,
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

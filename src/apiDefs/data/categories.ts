import { appealsContent } from '../../content/apiDocs/appeals';
import { benefitsContent } from '../../content/apiDocs/benefits';
import { facilitiesContent } from '../../content/apiDocs/facilities';
import { healthContent } from '../../content/apiDocs/health';
import { vaFormsContent } from '../../content/apiDocs/vaForms';
import { loanGuarantyContent } from '../../content/apiDocs/loanGuaranty';
import { verificationContent } from '../../content/apiDocs/verification';

import { APICategories } from '../schema';
import appealsApis from './appeals';
import benefitsApis from './benefits';
import facilitiesApis from './facilities';
import healthApis from './health';
import vaForms from './vaForms';
import loanGuarantyApis from './loanGuaranty';
import verificationApis from './verification';

const apiDefinitions: APICategories = {
  appeals: {
    apis: appealsApis,
    content: appealsContent,
    name: 'Appeals APIs',
    properName: 'Appeals API',
  },
  benefits: {
    apis: benefitsApis,
    content: benefitsContent,
    name: 'Benefits APIs',
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
    name: 'Health APIs',
    properName: 'Health API',
  },
  loanGuaranty: {
    apis: loanGuarantyApis,
    content: loanGuarantyContent,
    name: 'Loan Guaranty APIs',
    properName: 'Loan Guaranty API',
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
    name: 'Veteran Verification APIs',
    properName: 'Veteran Verification API',
  },
};

export const apiCategoryOrder: string[] = [
  'appeals',
  'benefits',
  'facilities',
  'vaForms',
  'health',
  'loanGuaranty',
  'verification',
];
export default apiDefinitions;
